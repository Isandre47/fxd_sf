<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    #[Route('/', name: 'home')]
    public function home(): Response
    {
        return $this->render('static/home.html.twig', [
            'page_title' => 'home',
            'user' => 'toto',
            'nav_type' => 'std',
        ]);
    }
    #[Route('/comment-ca-marche', name: 'about')]
    public function about(): Response
    {
        return $this->render('static/about.html.twig', [
            'page_title' => 'home',
            'user' => 'toto',
            'nav_type' => 'std',
        ]);
    }
}
