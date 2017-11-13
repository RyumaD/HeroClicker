<?php

header("Access-Control-Allow-Origin:*",false);
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
require "flight/Flight.php"; 
require "autoload.php";

//Enregistrer en global dans Flight le BddManager
Flight::set("BddManager", new BddManager());


Flight::route("OPTIONS|POST /login", function(){
    $data = json_decode(file_get_contents("php://input"), true);
    $username = $data['username'];
    $password = $data['password'];
    $status = [
        "success" => false,
        "id" => 0
    ];
    if( strlen( $username ) > 0 && strlen( $password ) > 0 ) {
        $user = new User();
        $user->setUsername( $username );
        $user->setPassword( $password );
        $bddManager = Flight::get("BddManager");
        $repo = $bddManager->getUserRepository();
        $id = $repo->login( $user );
        if( $id != 0 ){
            $status["success"] = true;
            $status["id"] = $id;
        }
    }
    echo json_encode( $status ); 
});

Flight::route("OPTIONS|POST /signin", function(){
    $data = json_decode(file_get_contents("php://input"), true);
    $username = $data['username'];
    $password = $data['password'];
    $status = [
        "success" => false,
        "id" => 0
    ];
    if( strlen( $username ) > 0 && strlen( $password ) > 0 ) {
        $user = new User();
        $user->setUsername( $username );
        $user->setPassword( $password );
        $bddManager = Flight::get("BddManager");
        $repo = $bddManager->getUserRepository();
        $id = $repo->register( $user );
        if( $id != 0 ){
            $status["success"] = true;
            $status["id"] = $id;
        }
    }
    echo json_encode( $status ); 
});

Flight::route("OPTIONS|PUT /userexp/@id", function($id){
    $status = [
        "success" => false,
        "id" => 0
    ];
    $exp = Flight::request()->data["exp"];
    $user = new User();
    $user->setId($id);
    $user->setExp($gold);
    $bddManager = Flight::get("BddManager");
    $repo = $bddManager->getuserRepository();
    $result = $repo->Experience();
    if( $result != 0 ){
        $status["success"] = true;
        $status["id"] = $result;
    }
    
    echo json_encode( $status ); 
});

Flight::route("OPTIONS|PUT /usergold/@id", function($id){
    $status = [
        "success" => false,
        "id" => 0
    ];
    $gold = Flight::request()->data["gold"];
    $user = new User();
    $user->setId($id);
    $user->setGold($gold);
    $bddManager = Flight::get("BddManager");
    $repo = $bddManager->getUserRepository();
    $result = $repo->goldMaker();
    if( $result != 0 ){
        $status["success"] = true;
        $status["id"] = $result;
    }
    
    echo json_encode( $status ); 
});

Flight::route("OPTIONS|PUT /userlvl/@id", function($id){
    $status = [
        "success" => false,
        "id" => 0
    ];
    $level = Flight::request()->data["level"];
    $user = new user();
    $user->setId($id);
    $user->setLevel($level);
    $bddManager = Flight::get("BddManager");
    $repo = $bddManager->getUserRepository();
    $result = $repo->levelUp();
    if( $result != 0 ){
        $status["success"] = true;
        $status["id"] = $result;
    }
    
    echo json_encode( $status ); 
});

Flight::route("GET /objects", function(){
    $status = [
        "success" => false,
        "id" => 0
    ];
    $bddManager = Flight::get("BddManager");
    $repo = $bddManager->getObjectRepository();
    $result = $repo->getAllObject();
    if( $result != 0 ){
        $status["success"] = true;
        $status["id"] = $result;
    }
    
    echo json_encode( $status ); 
});

Flight::route("GET /object/@id", function($id){
    $status = [
        "success" => false,
        "id" => 0
    ];
    $obj = new Object();
    $obj->setId($id);
    $bddManager = Flight::get("BddManager");
    $repo = $bddManager->getObjectRepository();
    $object = $repo->getObjectById($obj);
    if( $object != 0 ){
        $status["success"] = true;
        $status["id"] = $object;
    }
    
    echo json_encode( $status ); 
});

Flight::route("OPTIONS|POST /myobjects", function(){
    $status = [
        "success" => false,
        "id" => 0
    ];
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'];
    $user = new User();
    $user->setId($id);
    $bddManager = Flight::get("BddManager");
    $repo = $bddManager->getObjectRepository();
    $result = $repo->getAllObjectByUserid($user);
    if( $result != 0 ){
        $status["success"] = true;
        $status["id"] = $result;
    }
    
    echo json_encode( $status ); 
});

Flight::route("OPTIONS|POST /objectlvl/@id", function($id){
    $status = [
        "success" => false,
        "id" => 0
    ];
    $level = Flight::request()->data["level"];
    $obj = new Object();
    $obj->setId($id);
    $obj->setLevel($level);
    $bddManager = Flight::get("BddManager");
    $repo = $bddManager->getObjectRepository();
    $lvl = $repo->levelUp($obj);
    if( $lvl != 0 ){
        $status["success"] = true;
        $status["id"] = $lvl;
    }
    
    echo json_encode( $status ); 
});

Flight::route("GET /friends", function(){
    $status = [
        "success" => false,
        "id" => 0
    ];
    $bddManager = Flight::get("BddManager");
    $repo = $bddManager->getFriendRepository();
    $result = $repo->getAllFriend();
    if( $result != 0 ){
        $status["success"] = true;
        $status["id"] = $result;
    }
    
    echo json_encode( $status ); 
});

Flight::route("GET /friend/@id", function($id){
    $status = [
        "success" => false,
        "id" => 0
    ];
    $friend = new Friend();
    $friend->setId($id);
    $bddManager = Flight::get("BddManager");
    $repo = $bddManager->getFriendRepository();
    $result = $repo->getFriendById($friend);
    if( $result != 0 ){
        $status["success"] = true;
        $status["id"] = $result;
    }
    
    echo json_encode( $status ); 
});

Flight::route("OPTIONS|POST /myfriends", function(){
    $status = [
        "success" => false,
        "id" => 0
    ];
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'];
    $user = new User();
    $user->setId($id);
    $bddManager = Flight::get("BddManager");
    $repo = $bddManager->getFriendRepository();
    $result = $repo->getAllFriendByUserid($user);
    if( $result != 0 ){
        $status["success"] = true;
        $status["id"] = $result;
    }
    
    echo json_encode( $status ); 
});

Flight::route("OPTIONS|POST /friendgold/@id", function($id){
    $status = [
        "success" => false,
        "id" => 0
    ];
    $gold = Flight::request()->data["gold"];
    $friend = new Friend();
    $friend->setId($id);
    $friend->setGold($gold);
    $bddManager = Flight::get("BddManager");
    $repo = $bddManager->getFriendRepository();
    $result = $repo->goldMaker();
    if( $result != 0 ){
        $status["success"] = true;
        $status["id"] = $result;
    }
    
    echo json_encode( $status ); 
});

Flight::route("OPTIONS|POST /friendlvl/@id", function($id){
    $status = [
        "success" => false,
        "id" => 0
    ];
    $level = Flight::request()->data["level"];
    $friend = new Friend();
    $friend->setId($id);
    $friend->setLevel($level);
    $bddManager = Flight::get("BddManager");
    $repo = $bddManager->getFriendRepository();
    $result = $repo->levelUp();
    if( $result != 0 ){
        $status["success"] = true;
        $status["id"] = $result;
    }
    
    echo json_encode( $status ); 
});

Flight::route("GET /monsters", function(){
    $status = [
        "success" => false,
        "id" => 0
    ];
    $bddManager = Flight::get("BddManager");
    $repo = $bddManager->getMonsterRepository();
    $result = $repo->getAllMonster();
    if( $result != 0 ){
        $status["success"] = true;
        $status["id"] = $result;
    }
    
    echo json_encode( $status ); 
});

Flight::route("GET /monster/@id", function($id){
    $status = [
        "success" => false,
        "id" => 0
    ];
    $monster = new Monster();
    $monster->setId($id);
    $bddManager = Flight::get("BddManager");
    $repo = $bddManager->getMonsterRepository();
    $result = $repo->getMonsterById($monster);
    if( $result != 0 ){
        $status["success"] = true;
        $status["id"] = $result;
    }
    
    echo json_encode( $status ); 
});



Flight::start();