/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /*   a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('url defined', function() {
            for(var i =0; i < allFeeds.length; i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe("");
            }
        });
        /*  a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('name defined', function() {
            for(var i =0; i < allFeeds.length; i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe("");
            }
         });
    });


    /*  a new test suite named "The menu" */
    describe('The menu', function() {
        /*  a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         var menuIcon = document.querySelector(".menu-icon-link");
        it("menu hidden", function() {
            expect($("body").hasClass('menu-hidden')).toBe(true);   
        });
         /*  a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it("menu clicks", function() {
            menuIcon.click();
            expect($("body").hasClass('menu-hidden')).toBe(false);

            menuIcon.click();
            expect($("body").hasClass('menu-hidden')).toBe(true);
        });
    });
    /*  a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0,  done);
        });    
        /*  a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it("load feed", function(){
            var numEntries = document.querySelector(".feed").getElementsByClassName("entry").length;
            expect(numEntries).toBeGreaterThan(0);
          
        });
    });

    /*  a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {


        /*  a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var initFeed;
        beforeEach(function(done) {
            loadFeed(0, function() {
                initFeed = document.querySelector(".feed").innerHTML;
                loadFeed(1, function() {
                    done();
                });
            });
        });


        it("load feed changes", function(done) {
            var newFeedSelection = document.querySelector(".feed").innerHTML;
            expect(initFeed).not.toBe(newFeedSelection);
            done();
        });

    });
}());
