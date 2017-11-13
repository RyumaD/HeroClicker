<?php
class Object extends Model implements JsonSerializable {

    private $name;
    private $cost;
    private $level;
    private $power;

    function getName(){
        return $this->name;
    }

    function getCost(){
        return $this->cost;
    }

    function setName( $name ){
        $this->name = $name;
    }

    function setCost( $cost ){
        $this->cost = $cost;
    }

    function getLevel(){
        return $this->level;
    }

    function setLevel( $level ){
        $this->level = $level;
    }

    function getPower(){
        return $this->power;
    }

    function setPower( $power ){
        $this->power = $power;
    }

    function jsonSerialize(){
        return [
            "id" => $this->id,
            "name" => $this->name,
            "cost" => $this->cost,
            "level" => $this->level,
            "power" => $this->power
        ];
    }

}