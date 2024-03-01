<?php

require_once "dbEntity.php";

class post implements dbEntity {

    private $id;
    private $picturePath;
    private $publicationDate;
    private $text;
    private $nLikes;
    private $authorUsername;

    /**
     * Create a new post
     * @param int $id The post's id
     * @param string $picturePath The path of the picture
     * @param string $publicationDate The date of the publication
     * @param string $text The text of the post
     * @param int $nLikes The number of likes
     * @param string $authorUsername The username of the author
     */
    public function __construct($id = null, $picturePath = null, $publicationDate = null,
            $text = null, $nLikes = null, $authorUsername = null) {
        $this->id = $id;
        $this->picturePath = $picturePath;
        $this->publicationDate = $publicationDate;
        $this->text = $text;
        $this->nLikes = $nLikes;
        $this->authorUsername = $authorUsername;
    }
    public function update() {
        //TODO
    }

    public function delete() {
        //TODO
    }

    public function jsonSerialize() {
        return [
            'id' => $this->id,
            'picturePath' => $this->picturePath,
            'publicationDate' => $this->publicationDate,
            'text' => $this->text,
            'nLikes' => $this->nLikes,
            'authorUsername' => $this->authorUsername
        ];
    }
}

?>