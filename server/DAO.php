<?php
    class ConnMySQL{
        // 声明字段
        public $servername;
        public $username;
        public $password;
        public $dbname;
        public $conn;
        // 构造方法
        public function __construct($servername,$username,$password,$dbname){
            $this->servername = $servername;
            $this->username = $username;
            $this->password = $password;
            $this->dbname = $dbname;
        }
        // 连接数据库
        public function connect(){
            // 使用 PDO 连接
            try{
                $connStr = "mysql:host=$this->servername;dbname=$this->dbname";
                $conn = new PDO($connStr,$this->username,$this->password);
                $this->conn = $conn;
            }catch(PDOException $e){
                echo $e->getMessage();
            }
        }

        // 更新数据
        public function update($sql){
            if($this->conn == null){
                // 首先进行连接
                $this->connect();
            }
            // 执行 SQL 语句
            $res = $this->conn->exec($sql);
            // 执行 SQL 语句后关闭连接
            $this->close();
            if($res == 1){
                $result = array("result"=>$res,"code"=>1,"msg"=>"更新数据成功");
            }else{
                $result = array("result"=>$res,"code"=>-1,"msg"=>"更新数据失败");
            }
            return $result;
        }

        // 关闭连接
        public function close(){
            // 关闭连接，直接将 $this->conn 置为 null
            $this->conn = null;
        }
    }
?>