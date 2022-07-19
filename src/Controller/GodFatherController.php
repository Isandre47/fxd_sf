<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class GodFatherController extends AbstractController
{
    #[Route('/parrainage', name: 'godfather')]
    public function helpIndex(): Response
    {
        return $this->render('static/godfather.html.twig', [
            'page_title' => 'home',
            'user' => 'toto',
            'nav_type' => 'std',
            'url_playstore_cost' => $this->getParameter('app.playstore_url'),
        ]);
    }
}
