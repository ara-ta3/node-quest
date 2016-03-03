(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (__dirname){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = require("." + __dirname + "src/game/model/user.js");
var Status = require("." + __dirname + "src/game/model/status.js");
var UserRepository = require("." + __dirname + "src/game/repository/UserRepository.js");

var Game = function Game(robotBrain) {
    _classCallCheck(this, Game);

    this.userRepository = new UserRepository(robotBrain);
    this.users = this.userRepository.findAll();
};

;

module.exports = Game;

}).call(this,"/")
},{}]},{},[1]);
