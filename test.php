<?php

$c1 = new C;
$c1->f1();

$c2 = new C;
$c2->f1();

//C::f1();

class C {

  public function __construct() {
    self::set(1);
    /* $this->set(1); */
  }

  public function f1() {
    self::get();
    ++self::_val;
    self::get();

    /* $this->get(); */
    /* ++$this->_val; */
    /* $this->get(); */
  }

  public function set($val) {
    $this->_val = $val;
  }

  public function get() {
    var_dump($this->_val);
  }

  private $_val;

}

?>