<?php
class RicardoMartins_Findcep_IndexController extends Mage_Core_Controller_Front_Action
{
    public function findCepAction()
    {
        $digits = new Zend_Filter_Digits();
        $postcode = $this->getRequest()->getParam('postcode');
        $postcode = $digits->filter($postcode);

        $ch = curl_init(sprintf('http://api.findcep.com/v1/cep/%d.json', $postcode));
        curl_setopt_array(
            $ch,
            array(
                CURLOPT_RETURNTRANSFER  => 1,
                CURLOPT_SSL_VERIFYPEER  => 0,
                CURLOPT_SSL_VERIFYHOST  => 0,
                CURLOPT_MAXREDIRS       => 2,
                CURLOPT_TIMEOUT         => 2,
                CURLOPT_CONNECTTIMEOUT  => 2,
            )
        );

        $ret = curl_exec($ch);

        if (!$ret) {
            $ret = '{}';
        }


        $this->getResponse()->setHeader('Content-Type', 'application/json', true);
        $this->getResponse()->setBody($ret);
        Mage::helper('directory')->getRegionJson();
    }

    public function findAddressAction()
    {
        $digits = new Zend_Filter_Digits();
        $uf = $this->getRequest()->getParam('state');
        $city = $this->getRequest()->getParam('city');
        $street = $this->getRequest()->getParam('street');
        $street = str_replace(' ','+', $street);


        $ch = curl_init(sprintf('http://api.findcep.com/v1/endereco/%s/%s/%s', $uf, $city, $street));
        curl_setopt_array(
            $ch,
            array(
                CURLOPT_RETURNTRANSFER  => 1,
                CURLOPT_SSL_VERIFYPEER  => 0,
                CURLOPT_SSL_VERIFYHOST  => 0,
                CURLOPT_MAXREDIRS       => 2,
                CURLOPT_TIMEOUT         => 2,
                CURLOPT_CONNECTTIMEOUT  => 2,
            )
        );

        $ret = curl_exec($ch);

        if (!$ret) {
            $ret = '{}';
        }


        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $this->getResponse()->setBody($ret);
        Mage::helper('directory')->getRegionJson();
    }
}