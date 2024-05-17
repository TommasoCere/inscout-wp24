<?php

    namespace entities{
        require_once "dbEntity.php";
        require_once "dbDriver.php";
        require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'bootstrap.php';
        

        class Post implements \DBEntity {

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

            public function getId() {
                return $this->id;
            }

            public function getPicturePath() {
                return $this->picturePath;
            }

            public function getPublicationDate() {
                return $this->publicationDate;
            }

            public function getText() {
                return $this->text;
            }

            public function getNLikes() {
                return $this->nLikes;
            }

            public function getAuthorUsername() {
                return $this->authorUsername;
            }


            public function update(\DBDriver $db) {
                //TODO
            }

            public function delete(\DBDriver $db) {
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

        class Like implements \DBEntity{

            private $username;
            private $postId;

            /**
             * Create a new like
             * @param string $username The username of the user who liked the post
             * @param int $postId The id of the post
             */
            public function __construct($username = null, $postId = null) {
                $this->username = $username;
                $this->postId = $postId;
            }

            public function getUsername() {
                return $this->username;
            }

            public function getPostId() {
                return $this->postId;
            }

            public function update(\DBDriver $db) {
                $query = "INSERT INTO LIKES (username, idPost) VALUES (?, ?)";

                try {
                    $db->executeQuery($query, $this->username, $this->postId);
                    $query = "UPDATE POST SET nLikes = nLikes + 1 WHERE id = ?";
                    $db->executeQuery($query, $this->postId);
                } catch (\Exception $e) {
                    throw new \Exception("Error while liking post: " . $e->getMessage());
                }
            }

            public function delete(\DBDriver $db) {
                $query = "DELETE FROM LIKES WHERE username = ? AND idPost = ?";

                try {
                    $db->executeQuery($query, $this->username, $this->postId);
                    $query = "UPDATE POST SET nLikes = nLikes - 1 WHERE id = ?";
                    $db->executeQuery($query, $this->postId);
                } catch (\Exception $e) {
                    throw new \Exception("Error while liking post: " . $e->getMessage());
                }
            }

            public function jsonSerialize() {
                return [
                    'username' => $this->username,
                    'postId' => $this->postId
                ];
            }

        }

        class User implements \DBEntity {

            private $username;
            private $profilePicturePath;
            private $name;
            private $surname;
            private $email;
            private $password;
            private $section;
            private $groupCity;
            private $groupNumber;

            /**
             * Create a new user
             * @param string $username The username of the user
             * @param string $profilePicturePath The path of the profile picture
             * @param string $name The name of the user
             * @param string $surname The surname of the user
             * @param string $email The email of the user
             * @param string $password The password of the user
             * @param string $section The section of the user
             * @param string $groupCity The city of the user's group
             * @param int $groupNumber The number of the user's group
             */
            public function __construct($username = null, $profilePicturePath = null, $name = null,
                    $surname = null, $email = null, $password = null, $section = null,
                    $groupCity = null, $groupNumber = null) {
                $this->username = $username;
                $this->profilePicturePath = $profilePicturePath;
                $this->name = $name;
                $this->surname = $surname;
                $this->email = $email;
                $this->password = $password;
                $this->section = $section;
                $this->groupCity = $groupCity;
                $this->groupNumber = $groupNumber;
            }

            public function getUsername() {
                return $this->username;
            }

            public function getProfilePicturePath() {
                return $this->profilePicturePath;
            }

            public function getName() {
                return $this->name;
            }

            public function getSurname() {
                return $this->surname;
            }

            public function getEmail() {
                return $this->email;
            }

            public function getPassword() {
                return $this->password;
            }

            public function getSection() {
                return $this->section;
            }

            public function getGroupCity() {
                return $this->groupCity;
            }

            public function getGroupNumber() {
                return $this->groupNumber;
            }

            public function update(\DBDriver $db) {
                //TODO
            }

            public function delete(\DBDriver $db) {
                //TODO
            }

            public function jsonSerialize() {
                return [
                    'username' => $this->username,
                    'profilePicturePath' => $this->profilePicturePath,
                    'name' => $this->name,
                    'surname' => $this->surname,
                    'email' => $this->email,
                    'password' => $this->password,
                    'section' => $this->section,
                    'groupCity' => $this->groupCity,
                    'groupNumber' => $this->groupNumber
                ];
            }
        }

        class Comment implements \DBEntity {

            private $authorUsername;
            private $profilePicturePath;
            private $postId;
            private $id;
            private $text;


            /**
             * Create a new comment
             * @param string $authorUsername The username of the author
             * @param string $profilePicturePath The path of the author's profile picture
             * @param int $postId The id of the post
             * @param int $id The comment's id
             * @param string $text The text of the comment
             */
            public function __construct($authorUsername = null, $profilePicturePath = null, $postId = null, $id = null, $text = null) {
                $this->authorUsername = $authorUsername;
                $this->profilePicturePath = $profilePicturePath;
                $this->postId = $postId;
                $this->id = $id;
                $this->text = $text;
            }

            public function getAuthorUsername() {
                return $this->authorUsername;
            }

            public function getPostId() {
                return $this->postId;
            }

            public function getId() {
                return $this->id;
            }

            public function getText() {
                return $this->text;
            }

            public function getProfilePicturePath() {
                return $this->profilePicturePath;
            }

            public function update(\DBDriver $db) {
                //TODO
            }

            public function delete(\DBDriver $db) {
                //TODO
            }

            public function jsonSerialize() {
                return [
                    'authorUsername' => $this->authorUsername,
                    'profilePicturePath' => $this->profilePicturePath,
                    'postId' => $this->postId,
                    'id' => $this->id,
                    'text' => $this->text
                ];
            }
        }

        class Badge implements \DBEntity {
            private $title;

            /**
             * Create a new badge
             * @param string $title The title of the badge
             */
            public function __construct($title = null) {
                $this->title = $title;
            }

            public function getTitle() {
                return $this->title;
            }

            public function update(\DBDriver $db) {
                //TODO
            }

            public function delete(\DBDriver $db) {
                //TODO
            }

            public function jsonSerialize() {
                return [
                    'title' => $this->title
                ];
            }
        }

        class Achievement implements \DBEntity {
            private $username;
            private $title;

            /**
             * Create a new achievement
             * @param string $username The username of the user
             * @param string $title The title of the achievement
             */
            public function __construct($username = null, $title = null) {
                $this->username = $username;
                $this->title = $title;
            }

            public function getUsername() {
                return $this->username;
            }

            public function getTitle() {
                return $this->title;
            }

            public function update(\DBDriver $db) {
                //TODO
            }

            public function delete(\DBDriver $db) {
                //TODO
            }

            public function jsonSerialize() {
                return [
                    'username' => $this->username,
                    'title' => $this->title
                ];
            }
        }

        class Notification implements \DBEntity {
            private $receiverUsername;
            private $id;
            private $title;
            private $text;

            /**
             * Create a new notification
             * @param string $receiverUsername The username of the receiver
             * @param int $id The notification's id
             * @param string $title The title of the notification
             * @param string $text The text of the notification
             */
            public function __construct($receiverUsername = null, $id = null, $title = null, $text = null) {
                $this->receiverUsername = $receiverUsername;
                $this->id = $id;
                $this->title = $title;
                $this->text = $text;
            }

            public function getReceiverUsername() {
                return $this->receiverUsername;
            }

            public function getId() {
                return $this->id;
            }

            public function getTitle() {
                return $this->title;
            }

            public function getText() {
                return $this->text;
            }

            public function update(\DBDriver $db) {
                //TODO
            }

            public function delete(\DBDriver $db) {
                //TODO
            }

            public function jsonSerialize() {
                return [
                    'receiverUsername' => $this->receiverUsername,
                    'id' => $this->id,
                    'title' => $this->title,
                    'text' => $this->text
                ];
            }
        }

        class Group implements \DBEntity {
            private $city;
            private $number;
            private $region;

            /**
             * Create a new group
             * @param string $city The city of the group
             * @param int $number The number of the group
             * @param string $region The region of the group
             */
            public function __construct($city = null, $number = null, $region = null) {
                $this->city = $city;
                $this->number = $number;
                $this->region = $region;
            }

            public function getCity() {
                return $this->city;
            }

            public function getNumber() {
                return $this->number;
            }

            public function getRegion() {
                return $this->region;
            }

            public function update(\DBDriver $db) {
                //TODO
            }

            public function delete(\DBDriver $db) {
                //TODO
            }

            public function jsonSerialize() {
                return [
                    'city' => $this->city,
                    'number' => $this->number,
                    'region' => $this->region
                ];
            }
        }

        class Follow implements \DBEntity {

            private $followedUsername;
            private $followerUsername;

            /**
             * Create a new follow
             * @param string $followedUsername The username of the followed user
             * @param string $followerUsername The username of the follower
             */
            public function __construct($followedUsername = null, $followerUsername = null) {
                $this->followedUsername = $followedUsername;
                $this->followerUsername = $followerUsername;
            }

            public function getFollowedUsername() {
                return $this->followedUsername;
            }

            public function getFollowerUsername() {
                return $this->followerUsername;
            }

            public function update(\DBDriver $db) {
                //TODO
            }

            public function delete(\DBDriver $db) {
                //TODO
            }

            public function jsonSerialize() {
                return [
                    'followedUsername' => $this->followedUsername,
                    'followerUsername' => $this->followerUsername
                ];
            }
        }
    }
?>