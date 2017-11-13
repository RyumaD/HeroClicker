<?php
class User extends Model implements JsonSerializable {

    private $username;
    private $password;
    private $level;
    private $gold;
    private $power;
    private $exp;

    function __construct() {
        $this->gold = 0;
        $this->power = 1;
        $this->level = 1;
        $this->exp  = 0;
    }

    function getUsername(){
        return $this->username;
    }

    function getPassword(){
        return $this->password;
    }

    function setUsername( $username ){
        $this->username = $username;
    }

    function setPassword( $password ){
        $this->password = $password;
    }

    function getLevel(){
        return $this->level;
    }

    function getGold(){
        return $this->gold;
    }

    function setLevel( $level ){
        $this->level = $level;
    }

    function setGold( $gold ){
        $this->gold = $gold;
    }

    function getPower(){
        return $this->power;
    }

    function setPower( $power ){
        $this->power = $power;
    }

    function getExp(){
        return $this->exp;
    }

    function setExp( $exp ){
        $this->exp = $exp;
    }


    function jsonSerialize(){
        return [
            "id" => $this->id,
            "username" => $this->username,
            "password" => $this->password,
            "level" => $this->level,
            "gold" => $this->gold,
            "power" => $this->power,
            "exp" => $this->exp
        ];
    }

}