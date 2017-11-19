<?php
    include "DAO.php";
    class Praise extends ConnMySQL{
        public function __construct($servername,$username,$password,$dbname){
            parent::__construct($servername,$username,$password,$dbname);
        }

        public function updatePraiseNum(){
            // 定义 SQL 语句
            $sql = "UPDATE tb_praise_num set num=num+1 WHERE id=1";
            $res = $this->update($sql);
            echo json_encode($res);
        }
    }

    $praiseIns = new Praise("localhost","root","","db_praise");
    $praiseIns->updatePraiseNum();
?>