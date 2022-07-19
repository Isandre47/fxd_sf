<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use function Symfony\Component\DependencyInjection\Loader\Configurator\env;

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

    #[Route('/application-carte-conducteur', name: 'application')]
    public function application(): Response
    {
        return $this->render('static/application.html.twig', [
            'page_title' => 'home',
            'user' => 'toto',
            'nav_type' => 'std',
        ]);
    }

    #[Route('/plateforme', name: 'platform')]
    public function platform(): Response
    {
        return $this->render('static/platform.html.twig', [
            'page_title' => 'home',
            'user' => 'toto',
            'nav_type' => 'std',
        ]);
    }

    #[Route('/costs', name: 'costs')]
    public function costs(): Response
    {
        return $this->render('static/costs.html.twig', [
            'page_title' => 'home',
            'user' => 'toto',
            'nav_type' => 'std',
            'url_playstore_cost' => $this->getParameter('app.playstore_url'),
        ]);
    }
}
