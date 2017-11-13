<?php 
class ObjectRepository extends Repository {

    function getObjectById( Object $object ){

        $query = "SELECT * FROM objects WHERE id=:id";
        $prep = $this->connection->prepare( $query );
        $prep->execute([
            "id" => $object->getId()
        ]);
        $result = $prep->fetch(PDO::FETCH_ASSOC);

        if( empty( $result ) ){
            return false;
        }
        else {
            return $result;
        }   
    }

    function getAllObject(){
        $query = "SELECT * FROM objects";
        $prep = $this->connection->prepare( $query );
        $prep->execute([]);
        $result = $prep->fetchAll(PDO::FETCH_ASSOC);

        if( empty( $result ) ){
            return false;
        }
        else {
            return $result;
        }   
    }

    function getAllObjectByUserid( User $user ){

        $query = "SELECT * FROM object WHERE userid=:userid";
        $prep = $this->connection->prepare( $query );
        $prep->execute([
            "userid" => $user->getId()
        ]);
        $result = $prep->fetchAll(PDO::FETCH_ASSOC);

        if( empty( $result ) ){
            return false;
        }
        else {
            return $result;
        }
        
    }

    function levelUp( Object $object ){
        $query = "UPDATE object SET level=:level WHERE id=:id";
        $prep = $this->connection->prepare( $query );
        $prep->execute( [
            "level" => $object->getLevel(),
            "id" => $object->getId()
        ] );
        return $prep->rowCount();
    }
}