var game = game || {};
game.PlayerKeyboardProvider = game.PlayerKeyboardProvider || {};

(function (ns, Keyboard) {
  ns.create = function (options) {
    var keyboards = options.keyboards;

    var getKeyboard = function (player) {
      return keyboards[player] || Keyboard.createMock();
    };

    var switchKeyboards = function (player, other_player) {
      var player_keyboard = getKeyboard(player);
      var other_player_keyboard = getKeyboard(other_player);
      keyboards[other_player] = player_keyboard;
      keyboards[player] = other_player_keyboard;
    };

    return {
      getKeyboard: getKeyboard,
      switchKeyboards: switchKeyboards,
    };
  };
})(game.PlayerKeyboardProvider, utils.Keyboard);
