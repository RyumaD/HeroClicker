<?php 
//BddManager va contenir les instances de nos repository
class BddManager {

    private $userRepository;
    private $monsterRepository;
    private $objectRepository;
    private $friendRepository;
    private $connection;

    function __construct(){
        $this->connection = Connection::getConnection();
        $this->userRepository = new UserRepository( $this->connection );
        $this->monsterRepository = new MonsterRepository( $this->connection );
        $this->objectRepository = new ObjectRepository( $this->connection );
        $this->friendRepository = new FriendRepository( $this->connection );
    }

    function getUserRepository(){
        return $this->userRepository;
    }

    function getMonsterRepository(){
        return $this->monsterRepository;
    }

    function getObjectRepository(){
        return $this->objectRepository;
    }

    function getFriendRepository(){
        return $this->friendRepository;
    }

}