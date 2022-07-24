<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin_fd69120')]
class AdminController extends AbstractController
{
    #[Route('/index', name: 'admin_login')]
    public function index(): Response
    {
        return $this->redirectToRoute('app_login');
    }

    #[Route('/index_home', name: 'admin_home')]
    public function home(ManagerRegistry $managerRegistry): Response
    {
        $users = $managerRegistry->getRepository(User::class)->findAll();

        return $this->render('admin/home.html.twig', [
            'users' => count($users),
        ]);
    }
}
