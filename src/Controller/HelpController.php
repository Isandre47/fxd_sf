<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HelpController extends AbstractController
{
    #[Route('/help/index', name: 'help_index')]
    public function helpIndex(): Response
    {
        return $this->render('help/index.html.twig', [
            'page_title' => 'home',
            'user' => 'toto',
            'nav_type' => 'std',
            'url_playstore_cost' => $this->getParameter('app.playstore_url'),
        ]);
    }

    #[Route('/help/faq', name: 'help_faq')]
    public function helpFaq(): Response
    {
        return $this->render('help/faq.html.twig', [
            'page_title' => 'home',
            'user' => 'toto',
            'nav_type' => 'std',
            'url_playstore_cost' => $this->getParameter('app.playstore_url'),
        ]);
    }

    #[Route('/help/chat', name: 'help_chat')]
    public function helpChat(): Response
    {
        return $this->render('help/chat.html.twig', [
            'page_title' => 'home',
            'user' => 'toto',
            'nav_type' => 'std',
            'url_playstore_cost' => $this->getParameter('app.playstore_url'),
        ]);
    }
}
