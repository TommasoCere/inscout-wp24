<?php


class DBDriver {
    private $servername;
    private $username;
    private $password;
    private $dbname;

    private $conn;

    public function __construct($servername, $username, $password, $dbname) {
        $this->servername = $servername;
        $this->username = $username;
        $this->password = $password;
        $this->dbname = $dbname;
    }

    public function connect() {
        $this->conn = mysqli_connect($this->servername, $this->username, $this->password, $this->dbname, $this->dbport);
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }

    public function executeQuery(string $sql, ...$params): mysqli_result|bool{
        if (!$this->conn) {
            throw new Exception("Connection is not established");
        }
        $stmt = $this->conn->prepare($sql);
        $success = $stmt->execute($params);
        if (!$success) {
            throw new Exception("Error in query: " . $stmt->error);
        }
        $result = $stmt->get_result();
        $stmt->close();
        return $result;
    }

    public function close() {
        mysqli_close($this->conn);
    }
}
?>