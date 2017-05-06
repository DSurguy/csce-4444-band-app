var EventService = {
    getEvents: function (bandId, connection){
        return Promise.resolve([]);
    },
    createEvent: function (bandId, newEvent, connection){
        return Promise.resolve({});
    },
    editEvent: function (bandId, event, connection){
        return Promise.resolve({});
    },
    deleteEvent: function (bandId, eventId, connection){
        return Promise.resolve();
    }
};

module.exports = EventService;