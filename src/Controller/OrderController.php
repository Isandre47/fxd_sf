<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class OrderController extends AbstractController
{
    #[Route('/choisir-adresse-livraison', name: 'ship_select')]
    public function shipSelect(): Response
    {
        return $this->render('static/ship.html.twig',[
            'addresses' => $this->getUser()->getAddresses(),
        ]);
    }
}
