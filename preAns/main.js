enchant();

/* 独自クラスBearの定義 */
Bear = Class.create(Sprite,
{
    initialize: function(x, y) {
        Sprite.call(this, 32, 32);
        this.image = game.assets['chara1.gif'];
        this.x = x;
        this.y = y;
        /* 行きたい場所のX座標 */
        this.tx = this.x;
        /* 行きたい場所のY座標 */
        this.ty = this.y;
        this.frame = 10;
        game.rootScene.addChild(this);
    },

    /* enterframeイベントのリスナーを設定 */
    onenterframe: function() {
        slow = 30;
        /*問1*/
        this.x += (this.tx - this.x) / slow;
        this.y += (this.ty - this.y) / slow;
        /* */
    },
});

/* 独自クラスFruitsの定義 */
Fruits = Class.create(Sprite, // Spriteクラスを継承
{
    initialize: function(frame) {
        Sprite.call(this, 16, 16);
        this.image = game.assets['icon0.gif'];
        this.frame = frame;
        /* 0から320未満の任意の整数を設定 */
        this.x = Math.floor(Math.random() * 320);
        /* 0から320未満の任意の整数を設定 */
        this.y = Math.floor(Math.random() * 320);
        game.rootScene.addChild(this);
    },

    onenterframe: function() {
      /* 問2　*/
        if (this.within(bear)) {
            // 自分自身(フルーツ)を画面から消す
            game.rootScene.removeChild(this);
            score++;
        }
      /*  */
    },
});


window.onload = function() {

    game = new Game(320, 320);
    game.preload('chara1.gif', 'icon0.gif', 'clear.png');

    /* スコアを0に設定 */
    score = 0;

    fruits = Array();

    game.onload = function() {
        /* クマさんをつくる */
        /*問３*/
        bear = new Bear(32, 32);
        /**  */

        for (i = 0; i < 10; i++) {
            fruits[i] = new Fruits(15);
        }
    };

    game.rootScene.ontouchend =  function(event) {
        /* クマの「行きたい場所」にタッチされたX座標を指定 */
        /* クマの「行きたい場所」にタッチされたY座標を指定 */
        /*問４*/
        bear.tx = event.x;
        bear.ty = event.y;
        /**  */

    };

    /* game.debug()で動かすと，画像の枠がわかりやすくなるため，当り判定が確認しやすい */
    //game.start();
    game.debug();

    game.onenterframe = function(){
        if(score==10){
            /* クリア画面を出したいときは以下の記述 */
            game.endScene = new SplashScene();
            /*問５*/
            game.endScene.image = game.assets['clear.png'];
            /**  */

            game.end();
            score++;
        }
        else if(score ==11){
            alert(score + "点獲得しました!");
            /* alertを何度も表示されないようにする処理 */
            game.onenterframe = null;
        }
    };
};
