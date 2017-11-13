<?php
class Monster extends Model implements JsonSerializable {

    private $name;
    private $hp;
    private $exp;

    function getName(){
        return $this->name;
    }

    function getHp(){
        return $this->hp;
    }

    function setName( $name ){
        $this->name = $name;
    }

    function setHp( $hp ){
        $this->hp = $hp;
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
            "name" => $this->name,
            "hp" => $this->hp,
            "exp" => $this->exp
        ];
    }

}