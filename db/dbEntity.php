<?php

/**
 * Interface for a tuple of a database
 */
interface dbEntity extends JsonSerializable {

    /**
     * insert the tuple into the database
     * or uptate it if it already exists
     */
    public function update(/*db*/);

    /**
     * delete the tuple from the database
     */
    public function delete(/*db*/);

    /**
     * return the tuple as a json object
     */
    public function jsonSerialize();
    
    
}


?>