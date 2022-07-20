<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AccountController extends AbstractController
{
    #[Route('/mon-compte', name: 'home_account')]
    public function homeAccount(): Response
    {
        return $this->render('account/home.html.twig', [
            'nav_type' => 'osef',
        ]);
    }
}
