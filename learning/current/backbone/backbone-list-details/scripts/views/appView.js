App.Views.AppView = Backbone.View.extend({

    initialize: function(){

        this.detailView = new App.Views.DetailView();

        $('#detail').append(this.detailView.el);

        this.legislatorCollection = new App.Collections.Legislators();

        this.legislatorListView = new App.Views.Legislators({
            collection: this.legislatorCollection
        });

        $('#app').append(this.legislatorListView.el);

        this.fetchCollections();
    },

    fetchCollections: function(){
        var items = [
            {id: 1, bioguide_id: 'C001080', birthday: '1953-07-07', chamber: 'house', district: 27, fax: '202-225-5467', first_name: 'Judy', gender: 'F', in_office: true, last_name: 'Chu', middle_name: 'M.', office: '1520 Longworth House Office Building', party: 'D', phone: '202-225-5464', state_name: 'California', term_end: '2015-01-03', term_start: '2013-01-03', title: 'Rep', twitter_id: 'RepJudyChu', website: 'http://chu.house.gov', youtube_id: 'RepJudyChu'},
            {id: 2, bioguide_id: 'B000711', birthday: '1940-11-11', chamber: 'senate', district: null, fax: '202-224-0454', first_name: 'Barbara', gender: 'F', in_office: true, last_name: 'Boxer', middle_name: null, office: '112 Hart Senate Office Building', party: 'D', phone: '202-224-3553', state_name: 'California', term_end: '2017-01-03', term_start: '2011-01-05', title: 'Sen', twitter_id: 'senatorboxer', website: 'http://www.boxer.senate.gov', youtube_id: 'SenatorBoxer'},
            {id: 3, bioguide_id: 'F000062', birthday: '1933-06-22', chamber: 'senate',  district: null, fax: '202-228-3954', first_name: 'Dianne', gender: 'F', in_office: true, last_name: 'Feinstein', middle_name: null, office: '331 Hart Senate Office Building', party: 'D', phone: '202-224-3841', state_name: 'California', term_end: '2019-01-03', term_start: '2013-01-03', title: 'Sen', twitter_id: 'senfeinstein', website: 'http://www.feinstein.senate.gov', youtube_id: 'SenatorFeinstein'}
        ];

        this.legislatorCollection.reset(items);
    }
});