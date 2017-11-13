<?php 
class FriendRepository extends Repository {

    function getFriendById( Friend $friend ){

        $query = "SELECT * FROM friends WHERE id=:id";
        $prep = $this->connection->prepare( $query );
        $prep->execute([
            "id" => $friend->getId()
        ]);
        $result = $prep->fetch(PDO::FETCH_ASSOC);

        if( empty( $result ) ){
            return false;
        }
        else {
            return $result;
        }
        
    }
    
    function getAllFriend(){
        $query = "SELECT * FROM friends";
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

    function getAllFriendByUserid( User $user ){

        $query = "SELECT * FROM friend WHERE userid=:userid";
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

    function goldMaker( Friend $friend ){
        $query = "UPDATE friend SET gold=:gold WHERE id=:id";
        $prep = $this->connection->prepare( $query );
        $prep->execute( [
            "gold" => $friend->getGold(),
            "id" => $friend->getId()
        ] );
        return $prep->rowCount();
    }

    function levelUp( Friend $friend ){
        $query = "UPDATE friend SET level=:level WHERE id=:id";
        $prep = $this->connection->prepare( $query );
        $prep->execute( [
            "level" => $friend->getLevel(),
            "id" => $friend->getId()
        ] );
        return $prep->rowCount();
    }
}