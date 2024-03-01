<?php

/**
 * Interface for a tuple of a database
 */
interface DBEntity extends JsonSerializable {

    /**
     * insert the tuple into the database
     * or uptate it if it already exists
     */
    public function update(DBDriver $db);

    /**
     * delete the tuple from the database if exists
     */
    public function delete(DBDriver $db);

    /**
     * return the tuple as a json object
     */
    public function jsonSerialize();
    
    
}


?>