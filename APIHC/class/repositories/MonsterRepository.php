<?php 
class MonsterRepository extends Repository {

    function getMonsterById( Monster $monster ){

        $query = "SELECT * FROM monster WHERE id=:id";
        $prep = $this->connection->prepare( $query );
        $prep->execute([
            "id" => $monster->getId()
        ]);
        $result = $prep->fetch(PDO::FETCH_ASSOC);

        if( empty( $result ) ){
            return false;
        }
        else {
            return $result;
        }
    }

    function getAllMonster(){
        $query = "SELECT * FROM monster";
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
}