/* global Page */
/* global PageView */
/* global PageCtrl */
/* global $ */
/* global MenuComponent */
/* global User */
/* global Event */

function EventsPage(app, data){
    Page.call(this, app, $('#eventsPage')[0], EventsCtrl, EventsView, {
        menu: new MenuComponent(app, {
            element: '.menu-button-container'
        })
    });
}
EventsPage.prototype = Object.create(Page.prototype);
EventsPage.prototype.constructor = EventsPage;

function EventsCtrl(page){
    PageCtrl.call(this, page);
    this.members = [];
    this.events = [];
    this.bandId = window.location.pathname.split('/').reduce(function (val, chunk, index, arr){
        return val || (chunk == 'bands' ? arr[index+1] : undefined);
    }, undefined);
}
EventsCtrl.prototype = Object.create(PageCtrl.prototype);
EventsCtrl.prototype.constructor = EventsCtrl;
EventsCtrl.prototype.init = function (){
    var defer = $.Deferred(),
        ctrl = this;
    
    $.ajax({
        url: '/api/bands/'+ctrl.bandId+'/members',
        method: 'GET'
    })
    .then(function (members){
        ctrl.members = members.map(function (user){
            return new User(user);
        });
        
        //get events
        return $.ajax({
            url: '/api/bands/'+ctrl.bandId+'/events',
            method: 'GET'
        });
    })
    .then(function (events){
        ctrl.events = events.map(function (event){
            return new Event(event);
        });
        defer.resolve();
    })
    .catch(defer.reject);
    
    return defer.promise();
};
EventsCtrl.prototype.saveEvent = function (form){
    var defer = $.Deferred();
    var ctrl = this;
    
    var modifiedForm = $.clone(form);
    //remove the unchecked members from the form before we serialize
    $(modifiedForm).find('.member-check-label input:not(:checked)').remove();
    //serialize
    var formData = new FormData(modifiedForm);
    
    //determine if we're editing or creating
    var url, method;
    if( $(modifiedForm).find('[name=event-id]').val() !== '' ){
        url = '/api/bands/'+ctrl.bandId+'/events/'+$(modifiedForm).find('[name=event-id]').val();
        method = 'PUT';
    }
    else{
        url = '/api/bands/'+ctrl.bandId+'/events';
        method = 'POST';
    }
    
    $.ajax({
        url: url,
        type: method,
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    })
    .then(defer.resolve)
    .fail(defer.reject);
    
    return defer.promise();
};
EventsCtrl.prototype.deleteEvent = function (eventId){
    var defer = $.Deferred();
    $.ajax({
        url: '/api/bands/${ctrl.bandId}/setlists/'+eventId,
        type: 'DELETE'
    })
    .then(defer.resolve)
    .catch(defer.reject);
    
    return defer.promise();
};

function EventsView(page){
    PageView.call(this, page);
    this.eventMembers = [];
}
EventsView.prototype = Object.create(PageView.prototype);
EventsView.prototype.constructor = EventsView;
EventsView.prototype.init = function (){
    this.render();
    this.bindEvents();
};

EventsView.prototype.render = function (){
    var view = this;
    //render the songs to the song modal
    var eventsElem = $(view.page.elem).find('.event-list');
    eventsElem.empty();
    view.page.ctrl.events.forEach(function (event, index){
        eventsElem.append(`
        <a href="javascript://" class="event list-group-item list-group-item-action" data-event-index="${index}">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${event.title}</h5>
            </div>
        </a>`);
    });
};

EventsView.prototype.bindEvents = function (){
    var pageElem = $(this.page.elem),
        view = this;
    
    pageElem.on('click', '.add-event', function (e){
        view.showEventModal();
    });
    
    pageElem.on('click', '.modal .delete-event', function (e){
        if( view.page.ctrl.saving ){
            return false;
        }
        else{
            view.page.ctrl.saving = true;
        }
        
        var modal = $(this).parents('.modal');
        modal.find('.delete-event').html('<div class="fa fa-spinner animation-spin"></div>');
        
        var eventId = modal.find('[name=event-id]').val(),
            deletePromise;
        
        //just close the modal if we don't have an id
        if( eventId === '' ){
            deletePromise = $.Deferred().resolve().promise();
        }
        else{
            deletePromise = view.page.ctrl.deleteEvent(eventId);
        }
        
        deletePromise.then(function (){
            
            var eventIndex = view.page.ctrl.events.reduce(function (val, event, index){
                return val !== undefined ? val : (event.id == eventId ? index : undefined);
            },undefined);
            
            if( eventIndex !== undefined ){
                view.page.ctrl.events.splice(eventIndex,1);
            }
            
            view.render();
            modal.modal('hide');
            modal.find('.delete-event').html('Delete Event');
            modal.find('.alert').remove();
            view.page.ctrl.saving = false;
        })
        .catch(function (err){
            //display login failure
            modal.find('form').prepend('<div class="alert alert-danger alert-dismissible fade show" role="alert">'
              +'<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
                +'<span aria-hidden="true">&times;</span>'
              +'</button>'
              +'<strong>Unable to delete set list!</strong>'
            +'</div>');
            console.error(err);
            view.page.ctrl.saving = false;
            modal.find('.delete-event').html('Delete Event');
        });
    });
    
    pageElem.on('click', '.modal .save-event', function (e){
        $(this).parents('.modal').find('form').submit();
    });
    pageElem.on('submit', '.modal form', function (e){
        e.preventDefault();
        e.stopPropagation();
        if( view.page.ctrl.saving ){
            return false;
        }
        else{
            view.page.ctrl.saving = true;
        }
        
        var form = $(this);
        form.parents('.modal').find('.save-event').html('<div class="fa fa-spinner animation-spin"></div>');
        view.page.ctrl.saveEvent(this)
        .then(function (newEvent){
            
            var eventIndex = view.page.ctrl.events.reduce(function (val, event, index){
                return val !== undefined ? val : (event.id == newEvent.id ? index : undefined);
            },undefined);
            
            if( eventIndex !== undefined ){
                view.page.ctrl.events[eventIndex] = new Event(newEvent);
            }
            else{
                view.page.ctrl.events.push(new Event(newEvent));
                view.page.ctrl.events = view.page.ctrl.events.sort(function (a,b){
                    return a.name < b.name ? -1 : (a.name > b.name ? 1 : 0);
                });
            }
            view.render();
            form.parents('.modal').modal('hide');
            form.parents('.modal').find('.save-event').html('Save Event');
            form.parents('.modal').find('.alert').remove();
            view.page.ctrl.saving = false;
        })
        .catch(function (err){
            //display login failure
            form.prepend('<div class="alert alert-danger alert-dismissible fade show" role="alert">'
              +'<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
                +'<span aria-hidden="true">&times;</span>'
              +'</button>'
              +'<strong>Unable to save set list!</strong>'
            +'</div>');
            console.error(err);
            view.page.ctrl.saving = false;
            form.parents('.modal').find('.save-event').html('Save Event');
        });
    });
    
    pageElem.on('click', '.event', function (e){
        view.showEventModal(view.page.ctrl.events[$(this).attr('data-event-index')]);
    });
    
    pageElem.on('keyup', '.search', function (e){
        var search = $(this).val();
        
        var eventElems = pageElem.find('.event');
        view.page.ctrl.events.forEach(function (event, index){
            if( event.name.indexOf(search) !== -1 ){
                $(eventElems[index]).removeClass('search-hidden');
            }
            else{
                $(eventElems[index]).addClass('search-hidden');
            }
        });
    });
    
    pageElem.on('change', '.modal .member-check-label input', function (e){
        var memberElem = $(this).parents('.member-check-label'),
            currentIndex = memberElem.attr('data-index'),
            isChecked = this.checked,
            newIndex;
        
        //update the song's checked status
        view.eventMembers[currentIndex].checked = isChecked;
        
        if( view.eventMembers.length > 1 ){
            var movedMember = view.eventMembers.splice(currentIndex,1)[0];
            if( isChecked ){
                //item became checked
                for( var i=0; i<view.eventMembers.length; i++ ){
                    if( view.eventMembers[i].name.toLowerCase() > movedMember.name.toLowerCase() || !view.eventMembers[i].checked ){
                        view.eventMembers.splice(i,0,movedMember);
                        newIndex = i;
                        break;
                    }
                }
                //now move the actual element and fix the element numbers
                var existingElem = memberElem.siblings('[data-index='+newIndex+']');
                existingElem.before(memberElem);
            }
            else{
                //item became unchecked
                for( var i=0; i<view.eventMembers.length; i++ ){
                    if( !view.eventMembers[i].checked && view.eventMembers[i].name.toLowerCase() > movedMember.name.toLowerCase() ){
                        view.eventMembers.splice(i,0,movedMember);
                        newIndex = i;
                        break;
                    }
                }
                if( newIndex === undefined ){
                    //this sorts to the end of the list
                    newIndex = view.eventMembers.length;
                    view.eventMembers.push(movedMember);
                    //now move the actual element and fix the element numbers
                    var existingElem = memberElem.siblings('[data-index='+(newIndex)+']');
                    existingElem.after(memberElem);
                }
                else{
                    //now move the actual element and fix the element numbers
                    var existingElem = memberElem.siblings('[data-index='+(newIndex+1)+']');
                    existingElem.before(memberElem);
                }
            }
            var allMemberElems = memberElem.parent().find('.member-check-label');
            if( newIndex > currentIndex ){
                for( var i=currentIndex; i<=newIndex; i++ ){
                    $(allMemberElems[i]).attr('data-index',i);
                }
            }
            else{
                for( var i=newIndex; i<=currentIndex; i++ ){
                    $(allMemberElems[i]).attr('data-index',i);
                }
            }
        }
    });
    
    pageElem.on('change', '.modal [name=is-show]', function (e){
        if( this.checked ){
            $(this).parents('.modal').find('.show-dependent').removeClass('hidden');
        }
        else{
            $(this).parents('.modal').find('.show-dependent').addClass('hidden');
        }
    });
};

EventsView.prototype.showEventModal = function (event){
    var view = this,
        eventModal = $(this.page.elem).find('.event-modal');
    
    //reorder the songs according to the new setlist order
    if( event ){
        eventModal.find('[name=event-id]').val(event.id);
        eventModal.find('[name=title]').val(event.title);
        eventModal.find('[name=description]').val(event.description);
        eventModal.find('[name=location]').val(event.location);
        eventModal.find('[name=event-date]').val(event.date);
        eventModal.find('[name=event-time]').val(event.time);
        eventModal.find('[name=load-in-time]').val(event.loadInTime);
        eventModal.find('[name=venue]').val(event.venue);
        if( event.isShow ){
            eventModal.find('.show-dependent').removeClass('hidden');
            eventModal.find('[name=is-show]').attr('checked','checked');
        }
        else{
            eventModal.find('.show-dependent').addClass('hidden');
            eventModal.find('[name=is-show]').removeAttr('checked');
        }
        //TODO: Check items
        var checkedMembers = event.members.reduce(function (obj, member){
            obj[member.id] = true;
            return obj;
        }, {});
        
        view.eventMembers = $.extend([], view.page.ctrl.members).map(function (member){
            if( checkedMembers[member.id] ){
                member.checked = true;
            }
            return member;
        }).sort(function (a,b){
            if( a.checked && !b.checked ){
                return -1;
            }
            else if( b.checked && !a.checked ){
                return 1;
            }
            else{
                if( a.name.toLowerCase() < b.name.toLowerCase() ){
                    return -1;
                }
                else if( a.name.toLowerCase() > b.name.toLowerCase() ){
                    return 1;
                }
                else{
                    return 0;
                }
            }
        });
    }
    else{
        eventModal.find('[name=event-id]').val('');
        eventModal.find('[name=title]').val('');
        eventModal.find('[name=description]').val('');
        eventModal.find('[name=location]').val('');
        eventModal.find('[name=event-date]').val('');
        eventModal.find('[name=event-time]').val('');
        eventModal.find('[name=is-show]').removeAttr('checked');
        eventModal.find('[name=load-in-time]').val('');
        eventModal.find('[name=venue]').val('');
        eventModal.find('.show-dependent').addClass('hidden');
        view.eventMembers = $.extend([], view.page.ctrl.members).sort(function (a,b){
            if( a.checked && !b.checked ){
                return -1;
            }
            else if( b.checked && !a.checked ){
                return 1;
            }
            else{
                if( a.name.toLowerCase() < b.name.toLowerCase() ){
                    return -1;
                }
                else if( a.name.toLowerCase() > b.name.toLowerCase() ){
                    return 1;
                }
                else{
                    return 0;
                }
            }
        });
    }
    
    var membersElem = eventModal.find('.members').detach().empty();
    view.eventMembers.forEach(function (member, index){
        membersElem.append(''+
        '<label class="form-check-label member-check-label" data-index="'+index+'">'+
            '<input name="member-'+member.id+'" class="form-check-input" type="checkbox" value="" tabindex="-1" '+(member.checked?'checked':'')+'> '+
            '('+member.username+') '+member.firstName+' '+member.lastName+
        '</label>');
    });
    eventModal.find('.members-parent').append(membersElem);
    
    eventModal.find('.modal').modal();
};