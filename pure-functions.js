const Immutable = require('immutable')

const decrementHP = (player) => 
  player.set('hp', player.get('hp') - 1)

const isSameTeam = (player1, player2) =>
  player1.get('team') === player2.get('team')

const punch = (player, target) =>
  isSameTeam(player, target) ? target : decrementHP(target)

const alex = Immutable.Map({
  name: 'alex',
  hp: 20,
  team: 'red'
})

const xela = Immutable.Map({
  name: 'lexa',
  hp: 20,
  team: 'green'
})

