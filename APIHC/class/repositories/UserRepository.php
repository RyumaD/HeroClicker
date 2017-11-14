<?php 
class UserRepository extends Repository {

    private function getUserByUsername( User $user ){

        $query = "SELECT * FROM user WHERE username=:username";
        $prep = $this->connection->prepare( $query );
        $prep->execute([
            "username" => $user->getUsername()
        ]);
        $result = $prep->fetch(PDO::FETCH_ASSOC);

        if( empty( $result ) ){
            return false;
        }
        else {
            return $result;
        }
        
    }

    function getUserById( User $user ){
        $query = "SELECT * FROM user WHERE id=:id";
        $prep = $this->connection->prepare( $query );
        $prep->execute([
            "id" => $user->getId()
        ]);
        $result = $prep->fetch(PDO::FETCH_ASSOC);

        if( empty( $result ) ){
            return false;
        }
        else {
            return $result;
        }
        
    }
    function register( User $user ){
        $flag = $this->getUserByUsername($user);
        
        if(empty($flag)){
            return $this->signin( $user );
        }
    }

    private function signin( User $user ){

        $query = "INSERT INTO user SET username=:username, password=:password, level=:level, gold=:gold, power=:power, exp=:exp";
        $prep = $this->connection->prepare( $query );
        $prep->execute( [
            "username" => $user->getUsername(),
            "password" => $user->getPassword(),
            "level" => $user->getLevel(),
            "gold" => $user->getGold(),
            "power" => $user->getPower(),
            "exp" => $user->getExp()
        ] );
        return $this->connection->lastInsertId();

    }
    
    function login( User $user ){
        $query = "SELECT * FROM user WHERE username=:username AND password=:password";
        $prep = $this->connection->prepare( $query );
        $prep->execute([
            "username" => $user->getUsername(),
            "password" => $user->getPassword()
        ]);
        $result = $prep->fetch(PDO::FETCH_ASSOC);
        if( empty( $result ) ){
            return false;
        }
        else{
            return $result;
        }
    }
    function getUserIdByName($user){
        $query = "SELECT id FROM user WHERE username=:username";
        $prep = $this->connection->prepare( $query );
        $prep->execute([
            "username" => $user
        ]);
        $result = $prep->fetch(PDO::FETCH_ASSOC);
        if( empty( $result ) ){
            return false;
        }
        else{
            return $result["id"];
        }
    }

    function goldMaker( User $user ){
        $query = "UPDATE user SET gold=:gold WHERE id=:id";
        $prep = $this->connection->prepare( $query );
        $prep->execute( [
            "gold" => $user->getGold(),
            "id" => $user->getId()
        ] );
        return $prep->rowCount();
    }

    function levelUp( User $user ){
        $query = "UPDATE user SET level=:level WHERE id=:id";
        $prep = $this->connection->prepare( $query );
        $prep->execute( [
            "level" => $user->getLevel(),
            "id" => $user->getId()
        ] );
        return $prep->rowCount();
    }

    function Experience( User $user ){
        $query = "UPDATE user SET exp=:exp WHERE id=:id";
        $prep = $this->connection->prepare( $query );
        $prep->execute( [
            "exp" => $user->getExp(),
            "id" => $user->getId()
        ] );
        return $prep->rowCount();
    }
}