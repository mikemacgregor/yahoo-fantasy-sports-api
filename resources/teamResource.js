var teamHelper = require('../helpers/teamHelper.js');

module.exports = TeamResource;

function TeamResource(yf) {
  this.yf = yf;
}

TeamResource.prototype.meta = function(teamKey, cb) {
  var apiCallback = this._meta_callback.bind(this, cb);
  
  this
    .yf
    .api(
      this.yf.GET,
      'http://fantasysports.yahooapis.com/fantasy/v2/team/' + teamKey + '/metadata?format=json',
      apiCallback
    );
};

TeamResource.prototype._meta_callback = function(cb, e, data) {
  if ( e ) return cb(e);
  
  var metadata = teamHelper.mapTeam(data.fantasy_content.team[0]);
  return cb(null, metadata);
};

TeamResource.prototype.stats = function(teamKey, cb) {
  var apiCallback = this._stats_callback.bind(this, cb);
  
  this
    .yf
    .api(
      this.yf.GET,
      'http://fantasysports.yahooapis.com/fantasy/v2/team/' + teamKey + '/stats?format=json',
      apiCallback
    );
};

TeamResource.prototype._stats_callback = function(cb, e, data) {
  if ( e ) return cb(e);
  
  var stats = teamHelper.mapStats(data.fantasy_content.team[1]);
  var team = teamHelper.mapTeam(data.fantasy_content.team[0]);
  team.stats = stats;

  return cb(null, team);
};

TeamResource.prototype.standings = function(teamKey, cb) {
  var apiCallback = this._standings_callback.bind(this, cb);
  
  this
    .yf
    .api(
      this.yf.GET,
      'http://fantasysports.yahooapis.com/fantasy/v2/team/' + teamKey + '/standings?format=json',
      apiCallback
    );
};

TeamResource.prototype._standings_callback = function(cb, e, data) {
  if ( e ) return cb(e);
  
  var standings = data.fantasy_content.team[1].team_standings;
  var team = teamHelper.mapTeam(data.fantasy_content.team[0]);
  team.standings = standings;

  return cb(null, team);
};

TeamResource.prototype.roster = function(teamKey, cb) {
  var apiCallback = this._roster_callback.bind(this, cb);
   // (teamKey, week, cb)
  // 'http://fantasysports.yahooapis.com/fantasy/v2/team/' + teamKey + '/roster;weeks=' + weeks.split(',') + '?format=json'
  this
    .yf
    .api(
      'http://fantasysports.yahooapis.com/fantasy/v2/team/' + teamKey + '/roster?format=json',
      apiCallback
    );
};

TeamResource.prototype._roster_callback = function(cb, e, data) {
  if ( e ) return cb(e);
  
  var team = teamHelper.mapTeam(data.fantasy_content.team[0]);
  var roster = teamHelper.mapRoster(data.fantasy_content.team[1].roster);
  team.roster = roster;

  return cb(null, team);
};

TeamResource.prototype.draft_results = function(teamKey, cb) {
  var apiCallback = this._draft_results_callback.bind(this, cb);
  
  this
    .yf
    .api(
      this.yf.GET,
      'http://fantasysports.yahooapis.com/fantasy/v2/team/' + teamKey + '/draftresults?format=json',
      apiCallback
    );
};

TeamResource.prototype._draft_results_callback = function(cb, e, data) {
  if ( e ) return cb(e);
  
  var draft_results = teamHelper.mapDraft(data.fantasy_content.team[1].draft_results);
  var team = teamHelper.mapTeam(data.fantasy_content.team[0]);
  team.draft_results = draft_results;

  return cb(null, team);
};

// h2h leagues only
// todo: add weeks param
TeamResource.prototype.matchups = function(teamKey, cb) {
  var apiCallback = this._matchups_callback.bind(this, cb);
  
  this
    .yf
    .api(
      this.yf.GET,
      'http://fantasysports.yahooapis.com/fantasy/v2/team/' + teamKey + '/matchups?format=json',
      apiCallback
    );
};

TeamResource.prototype._matchups_callback = function(cb, e, data) {
  if ( e ) return cb(e);
  
  var matchups = teamHelper.mapMatchups(data.fantasy_content.team[1].matchups);
  var team = teamHelper.mapTeam(data.fantasy_content.team[0]);
  team.matchups = matchups;

  return cb(null, team);
};