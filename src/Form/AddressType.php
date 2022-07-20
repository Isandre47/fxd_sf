<?php

namespace App\Form;

use App\Entity\Address;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class AddressType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('company', TextType::class, [
                'label' => 'Votre société: ',
                'required' => false,
            ])
            ->add('street', TextType::class, [
                'label' => '* Adresse',
            ])
            ->add('zip', IntegerType::class, [
                'label' => '* Code postal',
            ])
            ->add('city', TextType::class, [
                'label' => '* Ville',
            ])
            ->add('country', ChoiceType::class, [
                'choices' => [
                    'France' => 'France',
                    'Suisse' => 'Suisse',
                    'Belgique' => 'Belgique',
                ],
                'label' => '* Pays',
            ])
            ->add('phone_number', IntegerType::class, [
                'label' => 'Votre téléphone',
                'required' => false,
            ])
//            ->add('user')
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Address::class,
        ]);
    }
}
