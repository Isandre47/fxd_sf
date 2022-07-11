
function createPDF(societe,nom,prenom,adresse,cp,ville,pays,numeroFacture,dateFacture,moyenPayement,listeLignes, listeProduits, fraisLivraison){

	var listeFacture     = createListeProduits(listeLignes,listeProduits);
	var totalProduitsTTC = listeFacture[1];
	var multiplieurTVA   = listeFacture[2];
	var totalProduitsHT  = toFixedv2(totalProduitsTTC/multiplieurTVA,2);
	var total            = toFixedv2(parseFloat(fraisLivraison)+parseFloat(totalProduitsTTC),2);
	var prixTVA          = toFixedv2(parseFloat(total)-parseFloat(totalProduitsHT)-parseFloat(fraisLivraison)/parseFloat(multiplieurTVA),2);
    // Suppression de l'affichage de la TVA si le client habite hors métropole'
	if (pays !== 'FR') {
        var prixTVA = 'Non applicable';
        var total = toFixedv2(parseFloat(totalProduitsTTC) + parseFloat(fraisLivraison), 2);
    }

    var dd = {
        content: [
			{
				//La librairie ne marche qu'avec des images base64, convertisseur gratuit en ligne: https://www.base64-image.de/
				image: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMqaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjkyMEIwQ0ExMTEyODExRTY5RjQ0QzU5NjNBRTI5N0ZCIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjkyMEIwQ0EwMTEyODExRTY5RjQ0QzU5NjNBRTI5N0ZCIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NTEwRjdDNURDNjMxMUU1QUE2NkQ4MkZFQUU4QUM4NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3NTEwRjdDNkRDNjMxMUU1QUE2NkQ4MkZFQUU4QUM4NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAYEBAQFBAYFBQYJBgUGCQsIBgYI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',
				width:200
			},
            {
                text: '\n\nAdresse de facturation :',
                style: 'subheader'
            },
            societe,
            nom + ' ' + prenom,
            adresse,
            cp + ' ' + ville,
            pays,
            '\n\n',
            {
                style: 'table_margin',
                table: {
                    //widths: ['%','25%','45%'],
                    body: [
                        [{text:'Numéro de facture', style: 'tableHeader'},{text:'Date de facturation', style: 'tableHeader'},{text:'Mode de paiement', style: 'tableHeader'}],
                        [numeroFacture, dateFacture, moyenPayement]
                    ]
                },
				layout: {
					hLineWidth: function(i, node) {
							return (i === 0 || i === node.table.body.length) ? 2 : 1;
					},
					vLineWidth: function(i, node) {
							return (i === 0 || i === node.table.widths.length) ? 2 : 1;
					},
					hLineColor: function(i, node) {
							return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
					},
					vLineColor: function(i, node) {
							return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
					}
				}
            },
            {
                style: 'table_margin',
                table: {
                    widths: ['55%','20%','10%','15%'],
                    body: listeFacture[0]
                },
                layout: 'lightHorizontalLines'
            },
            {
                style: 'table_margin',
                table: {
                    widths: ['50%','20%','10%','20%'],
                    body: [
						['',{text: 'Total Produits HT (€)', alignment: 'right', style: 'tableHeader', colSpan:2},{},{text: totalProduitsHT, alignment: 'right'}],
						['',{text: 'Frais de livraison HT (€)', alignment: 'right', style: 'tableHeader', colSpan:2},{},{text: toFixedv2(fraisLivraison/multiplieurTVA,2), alignment: 'right'}],
						['',{text: 'TVA ('+convertTVAtoSrint(multiplieurTVA)+'%) (€)', alignment: 'right', style: 'tableHeader', colSpan:2},{},{text: prixTVA, alignment: 'right'}],
                        ['',{text: 'Total TTC (€)', alignment: 'right', style: 'tableHeader', colSpan:2},{},{text: total, alignment: 'right'}],
                    ]
                },
                layout: 'noBorders'
            },
            '\n\n\n',
            {text:'Les marchandises restent notre propriété jusqu’au paiement intégral, loi 80-335 du 12-05-80. Le non règlement des factures à l’échéance entraînera de plein droit, conformément à l’article L.441-6 alinéa 12 du Code de Commerce, au paiement d’une indemnité calculée sur la base de 3 fois le taux d’intérêt minimum légal en vigueur et à une indemnité forfaitaire pour frais de recouvrement de 40 euros.', italics: true, alignment: 'center', fontSize:8},
            {text:'Condition Générale de Vente\n\n', style:'header', alignment:'center', pageBreak: 'before'},
            {
                alignment: 'justify',
                fontSize: 7,
                columnGap: 5,
                columns:[
                    {
                        text:'Article 1 - Objet\n'
                            +'Les présentes conditions régissent les ventes par la société ERECA 33 Rue Jean Jaurès, 69120 VAULX EN VELIN du lecteur de carte Fox Driver et de ses services.\n'
                            +'Article 2 - Prix\n'
                            +'Les prix de nos produits sont indiqués en euros toutes taxes comprises (TVA et autres taxes applicables au jour de la commande), sauf indication contraire et hors frais de traitement et d\'expédition. En cas de commande vers un pays autre que la France métropolitaine vous êtes l\'importateur du ou des produits concernés. Des droits de douane ou autres taxes locales ou droits d\'importation ou taxes d\'état sont susceptibles d\'être exigibles. Ces droits et sommes ne relèvent pas du ressort de la société ERECA. Ils seront à votre charge et relèvent de votre entière responsabilité, tant en termes de déclarations que de paiements aux autorités et organismes compétents de votre pays. Nous vous conseillons de vous renseigner sur ces aspects auprès de vos autorités locales.Toutes les commandes quelle que soit leur origine sont payables en euros. La société ERECA se réserve le droit de modifier ses prix à tout moment, mais le produit sera facturé sur la base du tarif en vigueur au moment de la validation de la commande et sous réserve de disponibilité. Les produits demeurent la propriété de la société ERECA jusqu\'au paiement complet du prix. Attention : dès que vous prenez possession physiquement des produits commandés, les risques de perte ou d\'endommagement des produits vous sont transférés.\n'
                            +'Article 3 - Commandes\n'
                            +'Vous pouvez passer commande :	Sur Internet : www.fox-driver.com Les informations contractuelles sont présentées en langue française et feront l\'objet d\'une confirmation au plus tard au moment de la validation de votre commande. La société ERECA se réserve le droit de ne pas enregistrer un paiement, et de ne pas confirmer une commande pour quelque raison que ce soit, et plus particulièrement en cas de problème d\'approvisionnement, ou en cas de difficulté concernant la commande reçue.\n'
                            +'Article 4 - Validation de votre commande\n'
                            +'Toute commande figurant sur le site Internet www.fox-driver.com suppose l\'adhésion aux présentes Conditions Générales. Toute confirmation de commande entraîne votre adhésion pleine et entière aux présentes conditions générales de vente, sans exception ni réserve. L\'ensemble des données fournies et la confirmation enregistrée vaudront preuve de la transaction. Vous déclarez en avoir parfaite connaissance. La confirmation de commande vaudra signature et acceptation des opérations effectuées. Un récapitulatif des informations de votre commande et des présentes Conditions Générales, vous sera joints sous format papier lors de la livraison de votre commande.\n'
                            +'Article 5 - Paiement\n'
                            +'Le fait de valider votre commande implique pour vous l\'obligation de payer le prix indiqué. Le règlement de vos achats s\'effectue par carte bancaire grâce au système sécurisé Mercanet BNP Paribas ou par Paypal.\n'
                            +'Article 6 - Rétractation\n'
                            +'Conformément aux dispositions de l\'article L.121-21 du Code de la Consommation, vous disposez d\'un délai de rétractation de 14 jours à compter de la réception de vos produits pour exercer votre droit de rétraction sans avoir à justifier de motifs ni à payer de pénalité. Les retours sont à effectuer dans leur état d\'origine et complets (emballage, accessoires, notice). Dans ce cadre, votre responsabilité est engagée. Tout dommage subi par le produit à cette occasion peut être de nature à faire échec au droit de rétractation. Les frais de retour sont à votre charge. En cas d\'exercice du droit de rétractation, la société ERECA procédera au remboursement des sommes versées, dans un délai de 14 jours suivant la notification de votre demande par chèque envoyé par courrier à l’adresse de facturation renseignée ou via le même moyen de paiement que celui utilisé lors de la commande.\n'
                            +'EXCEPTIONS AU DROIT DE RETRACTATION\n'
                            +'Conformément aux dispositions de l\'article L.121-21-8 du Code de la Consommation, le droit de rétractation ne s\'applique pas à :\n'
                            +'La fourniture de services pleinement exécutés avant la fin du délai de rétractation et dont l\'exécution a commencé après accord préalable exprès du consommateur et renoncement exprès à son droit de rétractation.\n'
                            +'La fourniture de biens ou de services dont le prix dépend de fluctuations sur le marché financier échappant au contrôle du professionnel et susceptibles de se produire pendant le délai de rétractation.\n'
                            +'La fourniture de biens confectionnés selon les spécifications du consommateur ou nettement personnalisés.\n'
                            +'La fourniture de biens qui ont été descellés par le consommateur après la livraison et qui ne peuvent être renvoyés pour des raisons d\'hygiène ou de protection de la santé.\n'
                            +'La fourniture de biens qui, après avoir été livrés et de par leur nature, sont mélangés de manière indissociable avec d\'autres articles.\n'
                            +'La fourniture de boissons alcoolisées dont la livraison est différée au-delà de trente jours et dont la valeur convenue à la\n'
                            +'La fourniture d\'enregistrements audio ou vidéo ou de logiciels informatiques lorsqu\'ils ont été descellés par le consommateur après la livraison.\n'
                            +'La fourniture d\'un journal, d\'un périodique ou d\'un magazine, sauf pour les contrats d\'abonnement à ces publications.\n'
                            +'Les transactions conclues lors d\'une enchère publique.\n'
                            +'La fourniture d\'un contenu numérique non fourni sur un support matériel dont l\'exécution a commencé après accord préalable exprès du consommateur et renoncement exprès à son droit de rétractation.\n'

                    },
                    {
                        text:'Article 7- Disponibilité\n'
                            +'Nos produits sont proposés tant qu\'ils sont visibles sur le site www.fox-driver.com et dans la limite des stocks disponibles. Pour les produits non stockés, nos offres sont valables sous réserve de disponibilité chez nos fournisseurs.En cas d\'indisponibilité de produit après passation de votre commande, nous vous en informerons par mail. Votre commande sera mise en attente de réapprovisionnement. Vous serez alors informé et aurez le choix d\'attendre le réapprovisionnement ou bien demander un remboursement de votre commande.\n'
                            +'Article 8 - Compatibilité\n'
							+'Fox Driver met à votre  disposition une liste d\'appareils compatibles indicatives avec le lecteur de carte et l\'application Fox Driver. Vous êtes tenu de bien vérifier la compatibilité de votre appareil avant de valider la commande. En cas de validation de commande alors que l\'appareil n\'apparaissait pas dans la liste, les frais de retours du produit seront à votre charge. Fox Driver s\'engage alors à vous remvourser dans un délai maximal de 30 jours. Dans le cas ou l\'appareil est répertorié dans la liste, mais que le lecteur ne fonctionne pas, Fox Driver s\'engage à payer l\'affranchissement pour le retour de votre commande et à vous rembourser dans un délai maximal de 7 jours.\n'
							+'Article 9 - Livraison\n'
                            +'Les produits sont livrés à l\'adresse de livraison indiquée au cours du processus de commande, dans le délai ouvré indiqué sur la page de validation de la commande. En cas de retard d\'expédition, un mail vous sera adressé pour vous informer d\'une éventuelle conséquence sur le délai de livraison qui vous a été indiqué. Conformément aux dispositions légales, en cas de retard de livraison, vous bénéficiez de la possibilité d\'annuler la commande dans les conditions et modalités définies à l\'article L 138-2 du Code de la Consommation. Si entre temps vous recevez le produit nous procéderons à son remboursement et aux frais d\'acheminement dans les conditions de l\'article L 138-3 du Code de la Consommation. En cas de livraisons par un transporteur, la société ERECA ne peut être tenue pour responsable de retard de livraison dû exclusivement à une indisponibilité du client après plusieurs propositions de rendez-vous.\n'
                            +'Article 10 - Garantie\n'
                            +'Tous nos produits bénéficient de la garantie légale de conformité et de la garantie des vices cachés, prévues par les articles 1641 et suivants du Code civil. En cas de non-conformité d\'un produit vendu, il pourra être retourné, échangé ou remboursé. Toutes les réclamations, demandes d\'échange ou de remboursement doivent s\'effectuer par message via le formulaire dédié sur le site dans le délai de 30 jours de la livraison. Les produits doivent nous être retournés dans l\'état dans lequel vous les avez reçus avec l\'ensemble des éléments (accessoires, emballage, notice...). Les frais d\'envoi vous seront remboursés sur la base du tarif facturé, les frais de retour eux restent à votre charge. Les dispositions de cet Article ne vous empêchent pas de bénéficier du droit de rétractation prévu à l\'article 6.\n'
                            +'Article 11 - Responsabilité\n'
                            +'Les produits proposés sont conformes à la législation française en vigueur. La responsabilité de la société ERECA ne saurait être engagée en cas de non-respect de la législation du pays où le produit est livré. Il vous appartient de vérifier auprès des autorités locales les possibilités d\'importation ou d\'utilisation des produits ou services que vous envisagez de commander. Par ailleurs, la société ERECA ne saurait être tenue pour responsable des dommages résultant d\'une mauvaise utilisation du produit acheté. Enfin la responsabilité de la société ERECA ne saurait être engagée pour tous les inconvénients ou dommages inhérents à l\'utilisation du réseau Internet, notamment une rupture de service, une intrusion extérieure ou la présence de virus informatiques.\n'
                            +'Article 12 - Droit applicable en cas de litiges\n'
                            +'La langue du présent contrat est la langue française. Les présentes conditions de vente sont soumises à la loi française. En cas de litige, les tribunaux français seront les seuls compétents.\n'
                            +'Article 13 - Propriété intellectuelle\n'
                            +'Tous les éléments du site www. fox-driver.com sont et restent la propriété intellectuelle et exclusive de la société ERECA. Nul n\'est autorisé à reproduire, exploiter, rediffuser, ou utiliser à quelque titre que ce soit, même partiellement, des éléments du site qu\'ils soient logiciels, visuels ou sonores. Tout lien simple ou par hypertexte est strictement interdit sans un accord écrit exprès de la société ERECA.\n'
                            +'Article 14 - Données personnelles\n'
                            +'La société ERECA se réserve le droit de collecter les informations nominatives et les données personnelles vous concernant. Elles sont nécessaires à la gestion de votre commande, ainsi qu\'à l\'amélioration des services et des informations que nous vous adressons. Elles peuvent aussi être transmises aux sociétés qui contribuent à ces relations, telles que celles chargées de l\'exécution des services et commandes pour leur gestion, exécution, traitement et paiement. Ces informations et données sont également conservées à des fins de sécurité, afin de respecter les obligations légales et réglementaires. Conformément à la loi du 6 janvier 1978, vous disposez d\'un droit d\'accès, de rectification et d\'opposition aux informations nominatives et aux données personnelles vous concernant, directement sur le site Internet.\n'
                            +'Article 15 - Archivage Preuve\n'
                            +'La société ERECA archivera les bons de commandes et les factures sur un support fiable et durable constituant une copie fidèle conformément aux dispositions de l\'article 1348 du Code civil. Les registres informatisés de la société ERECA seront considérés par toutes les parties concernées comme preuve des communications, commandes, paiements et transactions intervenus entre les parties.\n'
                    }
                ]
            }
        ],
        footer: function(page, pages){
                return {
                    columns:[
                        {width: '90%', text: 'FoxDriver est vendu par:\ne.re.c.a - 33 rue Jean Jaurès - 69120 Vaulx en Velin - contact@fox-driver.com\ns.a.r.l au capital de 30 000€ - Siret 38343027900026', alignment: 'center'},
                        {
                            width: '10%',
                            aligment: 'right',
                            text:[
                                '\n',
                                {text: page.toString() } ,
                                '/',
                                {text: pages.toString()}
                            ]
                        }
                    ],
                    margin: [0,-10]
                };
        },
        styles: {
            table_margin: {
                margin: [0,5,0,15],
                fontSize: 10
            },
            tableHeader: {
                bold: true
            },
            subheader:{
                bold: true,
                fontSize: 13
            },
            header:{
                fontsize: 15,
                bold: true
            }
        }
    };

	if(moyenPayement=='Carte Bleue')
		pdfMake.createPdf(dd).download('CB_'+numeroFacture+'.pdf');
	else
		pdfMake.createPdf(dd).download('PP_'+numeroFacture+'.pdf');
}

function createRefundPDF(societe,nom,prenom,adresse,cp,ville,pays,numeroFacture,dateFacture,moyenPayement,listeLignes, listeProduits, fraisLivraison, facture){

    var listeFacture     = createListeProduitsRefund(listeLignes,listeProduits);
    var totalProduitsTTC = listeFacture[1];
    var multiplieurTVA   = listeFacture[2];
    var totalProduitsHT  = toFixedv2(totalProduitsTTC/multiplieurTVA,2);
    var total            = toFixedv2(parseFloat(fraisLivraison * -1)+parseFloat(totalProduitsTTC),2);
    var prixTVA          = toFixedv2(parseFloat(total)-parseFloat(totalProduitsHT)-parseFloat(fraisLivraison * -1)/parseFloat(multiplieurTVA),2);


    var dd = {
        content: [
            {
                //La librairie ne marche qu'avec des images base64, convertisseur gratuit en ligne: https://www.base64-image.de/
                image: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMqaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjkyMEIwQ0ExMTEyODExRTY5RjQ0QzU5NjNBRTI5N0ZCIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjkyMEIwQ0EwMTEyODExRTY5RjQ0QzU5NjNBRTI5N0ZCIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NTEwRjdDNURDNjMxMUU1QUE2NkQ4MkZFQUU4QUM4NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3NTEwRjdDNkRDNjMxMUU1QUE2NkQ4MkZFQUU4QUM4NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHB8fHx8fHx8fHx8BBwcHDQwNGBAQGBoVERUaHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fH//AABEIALwB9AMBEQACEQEDEQH/xAC4AAEAAgIDAQAAAAAAAAAAAAAABgcFCAEDBAIBAQADAQEBAAAAAAAAAAAAAAAEBQYDAQIQAAEDAgIEBwgLCwwCAwAAAAABAgMEBREGITESB0FRYXETFAiBIjKTFVUWF5Gx0WJysuKzdDU3oUJSkiMzczSkdRjBgqLSQ9MklLTU5GY2VsKjJREBAAECAwQIBQQDAQAAAAAAAAECAxEEBTGhElIhkeFicjMUFUFRwdEyYSJCE3GBI7H/2gAMAwEAAhEDEQA/ANqQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGFzbd5rVaFnh/OyPSJi8SuRVx/okPO35t28Y2oWoZibVvGNuxWzsxX5zlctwqEx4EleifcUz85q7zT1szOcu81XXLj0gvvnGp8a/3R6m7zVdbz1d3nq65PSC++canxr/AHR6m7zVdZ6u7z1dcnpBffONT41/uj1N3mq6z1d3nq65PSC++canxr/dHqbvNV1nq7vPV1yekF9841PjX+6PU3earrPV3eerrk9IL75xqfGv90epu81XWeru89XXJ6QX3zjU+Nf7o9Td5qus9Xd56uuT0gvvnGp8a/3R6m7zVdZ6u7z1dcnpBffONT41/uj1N3mq6z1d3nq65PSC++canxr/AHR6m7zVdZ6u7z1dcnpBffONT41/uj1N3mq6z1d3nq65PSC++canxr/dHqbvNV1nq7vPV1yekF9841PjX+6PU3earrPV3eerrk9IL75xqfGv90epu81XWeru89XXJ6QX3zjU+Nf7o9Td5qus9Xd56uuT0gvvnGp8a/3R6m7zVdZ6u7z1dcvbas23mkq2PlqpaiJVwfHK9z0w5MVOtnO3KasZmZh3sahdoqxmZmP1WuadrQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACK7x/qKH6Sz4jys1Xyo8X3VOs+VHi+kq2M+zIAAAAAAAAAAAAAAAAAAOW+EnOIewvI2bdgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEV3j/UUP0lnxHlZqvlR4vuqdZ8qPF9JVsZ9mUgtGVfKtpdV086MqIlVJI36G8mngJ9jJf20Y0z0rHL5D+63xUz+5i7haLjb3q2rgcxE+/TS1eZSLdsV25/dCJey9duf3Q8ZycQAAAAAAAAAAAdlNS1NTIkdPE6V68DUxPqiiapwiMX3RRVVOFMYpXad3tXNsyXGRIGLp6Julyp/IWdjS6p6a+hbZfSKqumucGLzdR0FDc20VE3ZjiYm2q6VV3KpGztumivhp+CJqFui3Xw07IhhW+EnOQ4QoXkbNuwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACK7x/qKH6Sz4jys1Xyo8X3VOs+VHi+kq2M+zKR5VZ163XezbSsWrgcrHNXBUVE0YKW2k3MKppXejXMKpp+aqMm79b7l+d9nzJD5WtcMjou/TGaNrXKmjHX3S7qpiYwlf1UxVGExit210mS840XXstVzWSqmL6fHS1y8Dmrp9grb+mUVdNPRKqzGk0VdNH7ZYm6Zbu9tcvTwq6JNUrNLVKi9lLlvbHQpL+TuWtsdDGEdFcYoB9JHKupjl5mqp7hL3Cfk7Eo6tdUD/wAVT3gq+T6/rq+UuHU9S3woXp/NX3DyaZ+TyaKo+EutUc3wmq3nRUPHjjFOMPHroLXcK+To6SB0i8KomhO6dLdmuucKYdbViu5OFMYpda93kbG9NdZ0RrdLo2rg3D3yqWtjSvjXK5y+j/Guf9MFm3fBlLKcb7fYIWV1wbi3Fn5ti+/frUtrdmmiMKYXNqxRbjCmMHj3KX3MOZ7zdsw3epdKyFnV44U0RsxXa0N1auE6S6TL5vdX1u7VVRjij5F2eYyWYr4rkz+rF5m5x3Kp/V42+EnOcYcYXkbNuwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACK7x/qKH6Sz4jys1Xyo8X3VOs+VHi+kq2M+zLL5Sq+rX+lVVwbK7o3ryOJWSucN2EzIXOC9Soje1Z/JW8O8U7W7ML5ekg5WuTE1LYI7abxdLPWMrrZVSUlTHpbJG5U9kDZXc7vZzDmrZt14tT5ERuHlVjVSF2HA7HhEw8mMVg3DJNirZUkWJYXa16JdlF5yDd0+1XOOGCBe0y1XOOGH+HopMp2GmRNmla9yffP0qdKMlap+DpbyFmn+LJRUlLEmEcTGpyIhIiimNkJNNumNkOzYZ+CnsHuD6wcLHGuhWoqcyDCDCHmntNsn/PU0b8eNqHOqxRVtiHKrL0VbYhjX5Ky+6dsvV9nZXHo0XvV50I86faxxwRp02zM44PdWyMtNrlmo6RZegarmU0SYOdhwIS6aIpjCITaKIpjCIwaz7w96ucr3VS2+dkloo0VU6kmLJHN9+vCfT6V97fGBsfuhpEs26uW4qmzJW7Uqpw/gIcMzXw25lHzdzgt1T+jC68V41x9kybFuW+EnOIewvI2bdgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEV3j/UUP0lnxHlZqvlR4vuqdZ8qPF9JVsZ9mX1FI6OVkjVwcxyKi8ynsThOL2mcJxRHtI23avNnvcTfyddStiXBPCkRcfZNfbq4qYlt7VfFTEshun3AuuMUN7zU1WUrsH01v1OemtHScSH26Nh6C3UNvpmUtDAynp2Jg2ONqNT7gHoAAAAAAAAARnOW73Lma6R0VfTtbU4fkqtiIkjV48U190DWXPO7u+ZTurKKoas1PUP2aOranevRV1LxOAv68wstGRrVa4u9V0ce23nbi77qlXqlzCiI+ao1i5hbiPnKHFAzTlvhJziHsLyNm3YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABFd4/wBRQ/SWfEeVmq+VHi+6p1nyo8X0lWxn2ZcLqAnFoy3aM0WuzS3OLpvIk7nwscmLXOw0Y8xpdOr4rUfo1el3OKzEfJPERERERMETUhOWIAAAAAAAAAAAPDeLJbLvTsp7hC2aON7ZWIvA9ulFQCB7wqpH3SGlZ4FNGjVTlXShn9UuY3Ij5MzrFzG5EfJFisVLlvhJziHsLyNm3YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABFd4/1FD9JZ8R5War5UeL7qnWfKjxfSVbGfZlwoFu5UpWU9hpGomlzNp68aqanJUcNqGwyFHDZpZclJgB8ySRxsV8jkaxulXLoQ8mYja8mYiMZeKjvtprJnQ09Sx8jVw2UXXzHG3maK5wiXC3mrdc4Uz0ved0gAAeavudDQRdJVTNibwYrpXmQ53L1NEY1Tg5Xb1FuMapwfVHX0dbEktLK2Vi8LVPbdymuMaZxe27tNcY0zi7z7dAABXO8elZHdIJmpgs0a7fOi4FBqtGFcT82a1ijC5E/OESKtUOW+EnOIewvI2bdgFR7w9/vofmmpsPkLr3V2RP6z1vocelYj8NjoZMMMcPCAjf8V//AFb9v/4wD+K//q37f/xgH8V//Vv2/wD4wF3ZavPlvL1tvHQ9X8o00VT0G1t7HSsR+ztYN2sMdeCAZIAAAAAAAAAAAY3Mt58iZeuV46HrHk6mlqeg2tjb6Jiv2drB2zjhrwUCkf4r/wDq37f/AMYB/Ff/ANW/b/8AjAemh7VdtfIqV+XZoI9GDoKls7tenvXxwe2BZ+S95WUM4xKtmrMapjdqagnTo6hicewqqjkThcxVTlAlAAAAAqXP2/r0SzbNl7yF13okhXrXWuix6ZiP8DoZNW1+EBbQAAAAAAAAAAAAAAAAAAARXeP9RQ/SWfEeVmq+VHi+6p1nyo8X0lWxn2ZcKBbuU6ptTYaRyL3zW7L04lQ1OSr4rUNhkLnFZpZclJjEZlv7LLRNnWNZHyO2GJwY4Y6SLm8z/TTjgh53N/0U44Y4oHJVZmzNPsMRyw4+A3vY2pz8JSTXezE/ooJrv5qcI2bnprMg3mihbUUsiTStTF7Y8WuTmOlzTblEY0zjLpc0q7RGNM4y7LLne6UU7KO4sWVquRuLtEicB9ZfUK6J4a+l95bU7lE8NcY/+rFY5Hsa9NTkRU7pfROLRxOMIhmrOlRQVLqCji/LommV3L+ChV53PzRPDTHSp8/qU26uCmOlH6HLeYb9L1mre5kbtPSy46eZpBt5S7enGpX2slezE8VWz9XFXZMx5dn6emc5Yk1SxYqndaeV5e9YnGNjy5lr+WnGnZ+iT5TzhLdZ+pVMWzUNarukbqVE4+UsclnpuzwzHStMhqM3Z4Ko6UqLNbAFcbxqtkt0ggauKwswfzquJQarXjXEfJmtYuY3Ij5QiZVqhy3wk5xD2F5GzbsA1H7Q32pXH9DTfMNA2RoN32QnUFM52WrU5zomK5y0VOqqqtTSveAd/q8yB/6zav8AI039QB6vMgf+s2r/ACNN/UAzlNTU1LTxU1LEyCmhakcMETUYxjGpg1rWtwRERNSIB2AYaszrk2inWnrb9bqadvhRTVcEb052ueigZKjrqGugSooqiKqgd4M0L2yMXQi6HNVU1KB3gAAAAAAARveX9nmZf3ZV/MuA127OVms92zvXU11oae4U7LZLIyGqiZMxHpUQNRyNkRybWDlTHlA2N9XmQP8A1m1f5Gm/qAeC7bot290gdFNl+kg2m7KSUkaUr28KKiw7GlF4+7oA1w3hZGve7DNdJW2uql6q53TWm5Jgj0czwo5ME2dpuOnRg5q6taAbL7t85w5wylR3lrUjqXYw10LdTKiPBHonIuKObyKgEnA89fcrdbqZ1VcKqGjpm6HT1EjYo053PVEA6rXe7NdonTWqvpq+Ji4PkpZmTNRV4FWNXJwAR+/7qMg5gu77vd7X1m4yIxHz9PUx4pGiNb3scjG6ETiAloAAAAAAMPXZzyfQVC09dfbfSVDfChnqoI3ppVNLXPRdaAZGiuFBXwJUUNTFVU7vBmge2Ri4oi6HNVU1Kigd4ADz19yt1upnVVwqoaOmbodPUSNijTnc9UQDqtd7s12idNaq+mr4mLg+SlmZM1FXgVY1cnAB7QAAAAAiu8f6ih+ks+I8rNV8qPF91TrPlR4vpKtjPsyzFkytc7t38TUjp8e+ld/JxkrL5Ou7s2JuWyNy90xsWPl+wxWajWnjkdIrl2nuXVjyIaDK5aLVOES0uUysWacInFlCSlPDdbNRXRkTKtquZC/bRqLgirynG9YpuYRV8HC/lqbuEVfB6I4qSjg2WNZBC3maiHSmiKYwh1ooimMIjBjKzOeU6LHrd2pYcNe3K1P5T6fSL3rP+6ipcjqq6U8kjFRUliVFdinKhwu5ai5thGvZW3c/KOl9evDdtE1rEueKNRERUbjq7p2iMEiIwh4Gbz90k1xdXSVyPqH8Mje9TDiQ4elomvimOlH9JbmvjmMZSGl3rbvJ8EZe6ZnEj3o32yQkszSZmy3Xps0txpqhHaMGyNdj90Ew+qawWuC4+UaaNI5larV2NDVReHAj05aimvjiMJRqMpRTXxxGEskSEkAgWZskXGaqlr6WTrDpF2nxu0OTm4ykzen1zVNVM4s/ndMrmqa6ZxxQyenngkWOeN0cia2uTBSoqpmmcJUtVE0zhMYS+W+EnOeQ8heRs27ANR+0N9qVx/Q03zDQNsLb9XUv6GP4qAegAAVURFVVwRNKqoGre8zetmTO2YHZayu+VLQ+VaanhplVJK12OG29Uw/Jrra3VhpdyBl7T2V7vPRMlul9hoatyIrqaGnWpRuPAsiyQ6U4cEVOUCJ37Ku8TdHeILlS1atppXI2KvplctPKqYr0U8bsNOGnZcmHEujQGx27TPtJnbLMV0jYkNXG7oK+mRcejmaiKuzjp2HIuLfY4AKs7Ru7PaaudLVF3zdll5iYmtPBZUdzQ1/cXjAlG4PeSmZbB5EuEu1erSxrdpy99PTJg1knK5mhr+4vCB1b/wDeWmXrJ6P22XC83WNUle1e+gpV71zuR0mlre6vEBgOzlu0SGH0zukSdLKiss0Tk0tYuLXz87vBZyYrwoBfQACN7y/s8zL+7Kv5lwFB9l3/AM/uH7qm/wBTTgbQAAK53/2aO5bsrhKrUWa3Piq4V4la9GP/APrkcBAuytdpOlv1ocuMSthq4k4nIqxyeziz2AO/tW/q+Wfh1ntQgQ3J+Tc371Y6WKWtbQZfsEEVDBI5qyMa5jE2kjiRWbcjvCequTBFRMdQFj7tNxl0ydnzyrPXsrbbDSyNppo0WJ7pZMGbMkSudoRiuXwlTHACst/v2t1nwKT5lgF+758r+kW72508bNuro29dpNGK7cGLnInK6Pab3QKw7LeZ9ipu2WZn6JUSvpGrq2m4RzInKqbC9wDYYCge1JmfBlpyzC/wlWvrGovAmMcKL/TX2ALG3MZX9Hd3ttp5G7NXWN69V46F250RzUXlbHstXmAqLervTzHmvMrsnZQfJ1FJurf4ZdmWrmauD+/RUwiRUXhwVO+XRqD0Wnsr3eakbJdL9DRVLkRXQQU7qlG48CvWSDSnIgEXv+Tt4m6O5U93oqz/AAkr0Y2upVd0L3Iir0NRE7j04I7FF4Fx1BsZu2z3SZ1yxDdomJDUtVYa6mRcejnaiKqJ71yKjm8igVZ2rf1fLPw6z2oQIbk/Jub96sdLFLWtoMv2CCKhgkc1ZGNcxibSRxIrNuR3hPVXJgiomOoCx92m4y6ZOz55Vnr2VtthpZG000aLE90smDNmSJXO0IxXL4SpjgBc4AAAAARXeP8AUUP0lnxHlZqvlR4vuqdZ8qPF9JVsZ9mR9/W0RrUPrlpY2adLtH4p2szcxwoxd7E3ccKMcWDqe0tc6KZIqKnZcImrg+WbFuKe92TRZWm7Ef8ASWoylF6I/wCkpRZu07lSphVLlRz0c7G4rgiOY5eJvCS01B829pTM9wkkhsELbbS4/k53JtTKnKi6AK0uucM1XaRZLhdaiV668HuYnsNUDEyPkl/OvdJ8NVd7YHx0caamp7AHOy3iQBst4k9gDhY411tT2EA7Y56iL8zNJFhq2HK32gM9Zd4WdrK5HW67zx4cD3LInN32IFr5K7TNWyaOkzTSo+FcG9eh8JPfPbqwAl9/7SWR7fi23tlub1TvXRJgzHlx0gYOh7RUV4d1dGJa5VXBiv07Xsldm679P47FXna8xT00RGD01VxqLhJ1ieZJ3L/aJhp9goblyqqcatrOXblVc41bXU3wk5znDnC8jZt2Aaj9ob7Urj+hpvmGgZSDsx59mhjmbX2pGyNR7UWaoxwcmOn/AA4HZ/C7n/zhavHVP+3Alu6vcXm3KWc6S+XGroJaSCOZj2U8kzpFWSNzEwR8Mbda8YFlb0rrLa93l/rYnbEraR8cb01tdNhEipyorwKX7LVjp6i+3i8ysR0tvhigp1X711Sr1c5OXZiw7oGyIEY3mWKC+ZDvdBKxHuWlkmp8Uxwmhaskap/OagFIdlq6yxZou1r2l6GqokqNng24JWtT+jMoGyVRTwVNPLT1EbZYJmOjlicmLXMemDmqnEqKBqfm2xXndHvGprla9p1vWRZ7a9yrsywKuEtNIvCrUdsu7jgPnIWWbxvUz/UXK8Oc+ibIlTd500IjMcI6ePTo2kbst4mpiBtnBBDBDHBCxI4YmoyONqYNa1qYI1ETgRAPsABG95f2eZl/dlX8y4Cg+y7/AOf3D91Tf6mnA2gAAQ/fA9jN2WYVcuCLSq3Hlc5qJ91QKY7LMb1zZd5ERdhtAjVXgxdMxU+KoGb7Vv6vln4dZ7UIE53A0EdJuttT2pg+rdUVEq8blnexF/EY0CwwNS9/v2t1nwKT5lgG2ioipguoDUeoY/dpvrRyYx0NJWo9vEtDVJpTiXZikVOdANt0c1Wo5FRWqmKOTVhxgamO2t5e+3BMZbfU1mGjS1KGkT2E244/xnAbKZ/ukloyPfK+nXYmpqGZYHN+9kVitjXuOVANXdzeeMsZMv1Vdr3S1NTI6n6GiWlZG9WK9yLI5ekkiwxamGKcoFxfxRZA833XxNN/uAMBnzf5kDM2ULpY20FySashVtO6WKnRjZmqj4nOVJ3KiI9qY4IBj+yxc5mX292vFehmpWVOzwI6GRGY91JgMn2rf1fLPw6z2oQJzuBoI6TdbantTB9W6oqJV43LO9iL+IxoFhgAAAAAAiu8f6ih+ks+I8rNV8qPF91TrPlR4vpKtjPsyh2d7XlSZq1F2rJIp2p3kbXYr+IWOSu3o6KI6FrkL16OiinGFTVCU6TvSnVXQov5Ny6FVDQU44dO1paccOna6z6fQAAAAAAAAAAAGCAZKxR2GSrRl5fJHAup8es4X5uRH7NqPmJuxT/z2roy7BaILe2O1TrPSpqVXbSoZrMVVzV++MJZTM1XJqxrjCWVb4Sc5whHheRs27ANR+0N9qVx/Q03zDQNsLb9XUv6GP4qAegABDN8lG+s3Y5hiYiqraZJlw4oJGyu+4wCreypXQtqcxUDlRJpGUs8acKtjWRj/YWRoGwoGGzrcIrdlC9Vsq4Mgoah/OvRu2U7q4IBr12XqSR+eLhUon5KC3Pa5ffSTRbKew1QNnXOa1qucqNa1MXOXQiInCoGqO9TOVw3kZ4pbHYkWe308y0trjbqmlcuD6h3vVw0KupiY6MVA7N2Gbrluzz3VZfv/wCRt00yU1yaqqrYpE/N1LdHg4LpXhYuPAgG1bXNc1HNVFaqYoqaUVFAAAI3vL+zzMv7sq/mXAUH2Xf/AD+4fuqb/U04G0AACou0rmaG35JjsrXp1u8TMRY0XSkEDkke78dGIBjOy5l+Snsl2vsrcEr5mU1Mq8LKdFV7k5FfJh/NA8fat/V8s/DrPahAsXcl9ltg/QyfPyATcDUvf79rdZ8Ck+ZYBtoBQXajysjobVmeFnfMVaCsVE+9XGSFV5l207qAZGHeWrezytz6X/8AUZD5FRcU2kn/ADSOx/C6BUkAxvZcyurY7rmeZnh4UFG5U4EwkmVO7sJ7IFq71KaWp3c5iiiTaf1GZ6ImtUjbtr9xoGvW4LKeTs0Xm6W3MVGlZIynZPRNWaaFURj9mXDonx7Xht1gXd6g903mL9rrP74B6g903mL9rrP74DM5W3aZJyrXS11htvU6qaJYJJOmnlxjVyOVuEsj01tTgAqrtW/q+Wfh1ntQgWLuS+y2wfoZPn5AJuAAAAAACK7x/qKH6Sz4jys1Xyo8X3VOs+VHi+kq2M+zLE3fKtjuy7ddT9JJwSYqioSLWauW/wAZSrOcuWvxlE7jukpnYut9WrHLqjk8FO6T7erT/KFla1qf5Qi1x3fZmosVSn6yxNb4tKfdJ9vULVXxwWNrUrNfxw/ywE1PPA9WTRujcmtHIqEyKonYnU1ROyXXii6j16AAAAAAAJpXBNK8SaVAyFvy9e7gqdUo5JEX77DBPunG5mKKPylwuZm3R+UwlFt3U3abB9bOynYutrdL0INzVaI/GMVdd1iiPxjFKbduyy3SYLO11W9Pvnrhp5kIFzUrtWzoV13VrtWz9qTUlFSUcSQ0sTYY0+9amBBrrmqcZnFX13KqpxqnF6G+EnOfMPmF5GzbsA1H7Q32pXH9DTfMNA2wtv1dS/oY/ioB6AAHVWUkFZST0lQxH09RG6KZi6nMe1WuTuooGotXS5o3P7wmzxsWSOJz+qyPTCKso3LgrVVNS4YbX4Lu4BeVp7RO7OsomTVtZNbalUTpKWaCaRUdwoj4WSNVOJcU5kAq3e/vubm2jTL2XoZY7VK9q1M8iYS1DmriyNrEVcGbWC6dKrhq4QtLcNu8q8p5amqrnH0V3u7mSzQu8KKFiL0UbuJ3fOc5OXDgAwPaI3meS7euUrXLhcK5mNykaumKmcn5vkdLw+9+EB9dnfdr5KtvpZc4sLjcGYW6NyJjFTO/tOR0vxedQOztEbt/LFo9KbbFjc7ZGqVzGpplpW6Vdyuh1/Bx4kA6uzvvL8qW5Mp3SXG4UDMbdI5dMtM3+z+FF8XmUC6gAEb3l/Z5mX92VfzLgNXtzWfbPknM9VdbrDUT089FJSsZStY96PfLFIiqkj402cI14QLl/iiyB5vuviab/cAY68dqexMhclms1VPMre8dWOjgajtOtI3TKqJo4Ux5AK0tllz5vfza6vqsehxbHU1+wraalhbp6ONMdaIq7LMcVXSq61A2tsNjt9is1JaLdH0VHRRpFE3hXDSrnLwuc5Vc5eMCku1b+r5Z+HWe1CBYu5L7LbB+hk+fkAm4Gpe/37W6z4FJ8ywDbQCP5/y0zMuTrrZlajpamBy02PBPH38K4/DagGlnlG5pbFsSq7qvWusrTYLj1jY6LHDj2dAG6W73LLMs5NtVmRqNmp4UdVKnDPJ38q/juXDkAz08MU8MkEzUfFK1WSMXUrXJgqLzoBqHfrRmXdLvBjq6VF6GKR0ltqHIvRVFM7Q6N+HDsu2XprRdPEoF3WPtGbuK6jbLcaia01WCdJTTQyzJtcOw+BkiKicaonMBAN72/qhvlomy/lhsqUlV3tdcJW9Htx61jiYvfYO++c7Diw04gTbs85azLQWCe73yqqlbctjyfQzyyOayFqfnejcuDVk0Ye9TlAjvat/V8s/DrPahAsXcl9ltg/QyfPyATcAAAAAAEV3j/UUP0lnxHlZqvlR4vuqdZ8qPF9JVsZ9mQAAxUDzVdtt9Y3Yq6eOZvE5qH3Rcqp2Tg6UXaqPxnBG7luyy5V4uhR9K/gRi977BNt6lcp29Kfa1a7Tt6Vb5oyzV2Cv6vKvSQvTGGdEwRyF1lczF2nGNq/ymbpvU4xtYYkpQAA7qSkqKypjpqdivmlcjWNTjU+a64pjGdj5rrimJmdkLGtm6Sna1rrlVOeq6Vji73DkxKa7q0/xhQ3dZn+EJTbsn5doEToaNjpE1SPTFxAuZy5XtlXXc7dr2yzDUa1MGojUTUiIie0RkRyAAAct8JOcQ9heRs27AIjmHdNu/zFdZLrebV1qvlRrZJusVMeKMajW97HIxuhE4gJZHGyKNsbEwYxEa1NeCImCawPoAAAxt/wAt2LMNvdb71RR11I5cejkTS1fwmOTBzHcrVRQK3rOzLu7nmWSKe40jF1QwzxKxO7LFK7+kBKco7o8iZWnSqttvSSvbhs1tU5ZpW4cLNrvWLysaigTECF1+5rdtcbpNda60LU19RKs800lTVO2nquOlqy7OHvcMMNGGAEza1rWo1qI1rUwa1NCIicCAcua1zVa5EVqpgqLpRUUCF2/c1u3t10hutDaOrV9PKk0M0dTVN2XouOhqS7GHvcMMNGGAE0AAea522iuduqbdXR9NR1kT4KiLFzdqORFa5u01WuTFF4FAhHqD3TeYv2us/vgHqD3TeYv2us/vgPXb9y+6+gftwZfgeuKOwqHS1KYt1d7O+RMONOECY01NTUsDKemiZBBGmEcMbUYxqcTWtwRAOwDAZryHlTNjaZuYKHrraNXrTJ0s0Wysmzt/mXx447CawMjZLJbLHaqe1WuHq9BSorYIdp79lFcrl756uculy61A9wESv+6jIOYLu+73e19ZuMiMR8/T1MeKRojW97HIxuhE4gJaAAhi7nd263pb0tmb5RWo64svTVGz0230m10XSdHhtadnZw5AJmAA8F8sFlvtA633ijiraN64rFK3FEcmpzV1tdyouIFbV3Zn3c1M6ywy3CiYv9hBOxzE0quuaOZ/Dh4QGZyzuM3dWCojqoqF1fVxYLHPXv6bBUXHaSNEZFtcuxo4AJ+BgM15DypmxtM3MFD11tGr1pk6WaLZWTZ2/wAy+PHHYTWBkbJZLZY7VT2q1w9XoKVFbBDtPfsorlcvfPVzl0uXWoHuAAAAAABFd4/1FD9JZ8R5War5UeL7qnWfKjxfSVbGfZkAAAAADE5ny/T3y1yUr0RJk76CTha5CRlsxNqvH4JWUzM2a+KNnxUbWUlRR1UtLUN2JonK17V5DU0VxVGMbGworiqIqjZLpPp9AFqbtsqdTp0u9Yz/ABMyfkGr96xeHulDqWb4p4KdkM5quc4p4KdkbU6KpTAAAAAAct8JOcQ9heRs27AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIrvH+oofpLPiPKzVfKjxfdU6z5UeL6SrYz7MgAAAAAAIPvFyfJcYm3K3xLJWx97LExMXPbyInCha6bmuGeCdkrnSs5wz/XVsnYi8G6XeLPSJVx2aToVTaTFcHYfBXSXzRuzJ2R6+pvLvKtNJTQUbsZI5Wq1XOTUiY8BAz+a/rpwj8pVupZz+qjCPylbaI1rUa1MGtTBqJqREM2yrkAAAAAAHLfCTnEPYXkbNuwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACK7x/qKH6Sz4jys1Xyo8X3VOs+VHi+kq2M+zIAAAAAACYbuKakkramSVEdPGidEi8GOtULXSqKZqmZ2rnR6KZqmZ2wsMvmjQ3ePTUaUMM6ta2q28GqmhXJylTqtNPDE/FS6zRTwRP8lfFEzoAAAAAADlvhJziHsLyNm3YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABFd46L5Ci+ks+I8rNV8qPF91TrHlR4vpKtjPsyAAAAAAA7qOtqqOobUU0ixyt1OQ+7dyqicaZ6XS3cqonGmcJSNm8W9tj2Fiic7DDbXHEnxqlzDZCyjWLuGGEMDc7tXXKfpquRXuTwW8CJyEK9equTjVKvvX67s41S8hycQAAAAAAHLEVXIicYh7C8jZt2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeW522muNG+lqExjfw8KLxocr1qLlPDLlfs03KeGpEnbsY1cqtuKo3gRYcf/AJlXOkRzbu1Tzokc27tfPqxb5yXxPyx7R3t3aeyd/d2nqxb5yXxPyx7R3t3aeyd/d2nqxb5yXxPyx7R3t3aeyd/d2nqxb5yXxPyx7R3t3aeyd/d2nqxb5yXxPyx7R3t3aeyd/d2nqxb5yXxPyx7R3t3aeyd/d2nqxb5yXxPyx7R3t3aeyd/d2nqxb5yXxPyx7R3t3aeyd/d2nqxb5yXxPyx7R3t3aeyd/d2nqxb5yXxPyx7R3t3aeyd/d2nqxb5yXxPyx7R3t3aeyd/d2nqxb5yXxPyx7R3t3aeyd/d2nqxb5yXxPyx7R3t3aeyd/d2nqxb5yXxPyx7R3t3aeyd/d2nqxb5yXxPyx7R3t3aeyd/d2nqxb5yXxPyx7R3t3aeyd/d2vZa93tHR1TZ56lalGLi1mxsJjy98462dMppqxmcXaxpFNFWMzxf6S0tFuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/Z',
                width:200
            },
            {
                text: '\n\nAdresse de facturation :',
                style: 'subheader'
            },
            societe,
            nom + ' ' + prenom,
            adresse,
            cp + ' ' + ville,
            pays,
            '\n',
            'Avoir sur la facture ' + facture,
            '\n',
            {
                style: 'table_margin',
                table: {
                    //widths: ['%','25%','45%'],
                    body: [
                        [{text:'Numéro d\'avoir ', style: 'tableHeader'},{text:'Date de remboursement', style: 'tableHeader'},{text:'Mode de paiement', style: 'tableHeader'}],
                        [numeroFacture, dateFacture, moyenPayement]
                    ]
                },
                layout: {
                    hLineWidth: function(i, node) {
                            return (i === 0 || i === node.table.body.length) ? 2 : 1;
                    },
                    vLineWidth: function(i, node) {
                            return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                    },
                    hLineColor: function(i, node) {
                            return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                    },
                    vLineColor: function(i, node) {
                            return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                    }
                }
            },
            {
                style: 'table_margin',
                table: {
                    widths: ['55%','20%','10%','15%'],
                    body: listeFacture[0]
                },
                layout: 'lightHorizontalLines'
            },
            {
                style: 'table_margin',
                table: {
                    widths: ['50%','20%','10%','20%'],
                    body: [
                        ['',{text: 'Total Produits HT (€)', alignment: 'right', style: 'tableHeader', colSpan:2},{},{text: totalProduitsHT, alignment: 'right'}],
                        // ['',{text: 'Frais de livraison HT (€)', alignment: 'right', style: 'tableHeader', colSpan:2},{},{text: toFixedv2(fraisLivraison * -1 /multiplieurTVA,2), alignment: 'right'}],
                        ['',{text: 'TVA ('+convertTVAtoSrint(multiplieurTVA)+'%) (€)', alignment: 'right', style: 'tableHeader', colSpan:2},{},{text: prixTVA, alignment: 'right'}],
                        ['',{text: 'Total TTC (€)', alignment: 'right', style: 'tableHeader', colSpan:2},{},{text: total, alignment: 'right'}],
                    ]
                },
                layout: 'noBorders'
            },
            '\n\n\n',
            // {text:'Les marchandises restent notre propriété jusqu’au paiement intégral, loi 80-335 du 12-05-80. Le non règlement des factures à l’échéance entraînera de plein droit, conformément à l’article L.441-6 alinéa 12 du Code de Commerce, au paiement d’une indemnité calculée sur la base de 3 fois le taux d’intérêt minimum légal en vigueur et à une indemnité forfaitaire pour frais de recouvrement de 40 euros.', italics: true, alignment: 'center', fontSize:8},
            {text:'Condition Générale de Vente\n\n', style:'header', alignment:'center', pageBreak: 'before'},
            {
                alignment: 'justify',
                fontSize: 7,
                columnGap: 5,
                columns:[
                    {
                        text:'Article 1 - Objet\n'
                            +'Les présentes conditions régissent les ventes par la société ERECA 33 Rue Jean Jaurès, 69120 VAULX EN VELIN du lecteur de carte Fox Driver et de ses services.\n'
                            +'Article 2 - Prix\n'
                            +'Les prix de nos produits sont indiqués en euros toutes taxes comprises (TVA et autres taxes applicables au jour de la commande), sauf indication contraire et hors frais de traitement et d\'expédition. En cas de commande vers un pays autre que la France métropolitaine vous êtes l\'importateur du ou des produits concernés. Des droits de douane ou autres taxes locales ou droits d\'importation ou taxes d\'état sont susceptibles d\'être exigibles. Ces droits et sommes ne relèvent pas du ressort de la société ERECA. Ils seront à votre charge et relèvent de votre entière responsabilité, tant en termes de déclarations que de paiements aux autorités et organismes compétents de votre pays. Nous vous conseillons de vous renseigner sur ces aspects auprès de vos autorités locales.Toutes les commandes quelle que soit leur origine sont payables en euros. La société ERECA se réserve le droit de modifier ses prix à tout moment, mais le produit sera facturé sur la base du tarif en vigueur au moment de la validation de la commande et sous réserve de disponibilité. Les produits demeurent la propriété de la société ERECA jusqu\'au paiement complet du prix. Attention : dès que vous prenez possession physiquement des produits commandés, les risques de perte ou d\'endommagement des produits vous sont transférés.\n'
                            +'Article 3 - Commandes\n'
                            +'Vous pouvez passer commande : Sur Internet : www.fox-driver.com Les informations contractuelles sont présentées en langue française et feront l\'objet d\'une confirmation au plus tard au moment de la validation de votre commande. La société ERECA se réserve le droit de ne pas enregistrer un paiement, et de ne pas confirmer une commande pour quelque raison que ce soit, et plus particulièrement en cas de problème d\'approvisionnement, ou en cas de difficulté concernant la commande reçue.\n'
                            +'Article 4 - Validation de votre commande\n'
                            +'Toute commande figurant sur le site Internet www.fox-driver.com suppose l\'adhésion aux présentes Conditions Générales. Toute confirmation de commande entraîne votre adhésion pleine et entière aux présentes conditions générales de vente, sans exception ni réserve. L\'ensemble des données fournies et la confirmation enregistrée vaudront preuve de la transaction. Vous déclarez en avoir parfaite connaissance. La confirmation de commande vaudra signature et acceptation des opérations effectuées. Un récapitulatif des informations de votre commande et des présentes Conditions Générales, vous sera joints sous format papier lors de la livraison de votre commande.\n'
                            +'Article 5 - Paiement\n'
                            +'Le fait de valider votre commande implique pour vous l\'obligation de payer le prix indiqué. Le règlement de vos achats s\'effectue par carte bancaire grâce au système sécurisé Mercanet BNP Paribas ou par Paypal.\n'
                            +'Article 6 - Rétractation\n'
                            +'Conformément aux dispositions de l\'article L.121-21 du Code de la Consommation, vous disposez d\'un délai de rétractation de 14 jours à compter de la réception de vos produits pour exercer votre droit de rétraction sans avoir à justifier de motifs ni à payer de pénalité. Les retours sont à effectuer dans leur état d\'origine et complets (emballage, accessoires, notice). Dans ce cadre, votre responsabilité est engagée. Tout dommage subi par le produit à cette occasion peut être de nature à faire échec au droit de rétractation. Les frais de retour sont à votre charge. En cas d\'exercice du droit de rétractation, la société ERECA procédera au remboursement des sommes versées, dans un délai de 14 jours suivant la notification de votre demande par chèque envoyé par courrier à l’adresse de facturation renseignée ou via le même moyen de paiement que celui utilisé lors de la commande.\n'
                            +'EXCEPTIONS AU DROIT DE RETRACTATION\n'
                            +'Conformément aux dispositions de l\'article L.121-21-8 du Code de la Consommation, le droit de rétractation ne s\'applique pas à :\n'
                            +'La fourniture de services pleinement exécutés avant la fin du délai de rétractation et dont l\'exécution a commencé après accord préalable exprès du consommateur et renoncement exprès à son droit de rétractation.\n'
                            +'La fourniture de biens ou de services dont le prix dépend de fluctuations sur le marché financier échappant au contrôle du professionnel et susceptibles de se produire pendant le délai de rétractation.\n'
                            +'La fourniture de biens confectionnés selon les spécifications du consommateur ou nettement personnalisés.\n'
                            +'La fourniture de biens qui ont été descellés par le consommateur après la livraison et qui ne peuvent être renvoyés pour des raisons d\'hygiène ou de protection de la santé.\n'
                            +'La fourniture de biens qui, après avoir été livrés et de par leur nature, sont mélangés de manière indissociable avec d\'autres articles.\n'
                            +'La fourniture de boissons alcoolisées dont la livraison est différée au-delà de trente jours et dont la valeur convenue à la\n'
                            +'La fourniture d\'enregistrements audio ou vidéo ou de logiciels informatiques lorsqu\'ils ont été descellés par le consommateur après la livraison.\n'
                            +'La fourniture d\'un journal, d\'un périodique ou d\'un magazine, sauf pour les contrats d\'abonnement à ces publications.\n'
                            +'Les transactions conclues lors d\'une enchère publique.\n'
                            +'La fourniture d\'un contenu numérique non fourni sur un support matériel dont l\'exécution a commencé après accord préalable exprès du consommateur et renoncement exprès à son droit de rétractation.\n'

                    },
                    {
                        text:'Article 7- Disponibilité\n'
                            +'Nos produits sont proposés tant qu\'ils sont visibles sur le site www.fox-driver.com et dans la limite des stocks disponibles. Pour les produits non stockés, nos offres sont valables sous réserve de disponibilité chez nos fournisseurs.En cas d\'indisponibilité de produit après passation de votre commande, nous vous en informerons par mail. Votre commande sera mise en attente de réapprovisionnement. Vous serez alors informé et aurez le choix d\'attendre le réapprovisionnement ou bien demander un remboursement de votre commande.\n'
                            +'Article 8 - Compatibilité\n'
                            +'Fox Driver met à votre  disposition une liste d\'appareils compatibles indicatives avec le lecteur de carte et l\'application Fox Driver. Vous êtes tenu de bien vérifier la compatibilité de votre appareil avant de valider la commande. En cas de validation de commande alors que l\'appareil n\'apparaissait pas dans la liste, les frais de retours du produit seront à votre charge. Fox Driver s\'engage alors à vous remvourser dans un délai maximal de 30 jours. Dans le cas ou l\'appareil est répertorié dans la liste, mais que le lecteur ne fonctionne pas, Fox Driver s\'engage à payer l\'affranchissement pour le retour de votre commande et à vous rembourser dans un délai maximal de 7 jours.\n'
                            +'Article 9 - Livraison\n'
                            +'Les produits sont livrés à l\'adresse de livraison indiquée au cours du processus de commande, dans le délai ouvré indiqué sur la page de validation de la commande. En cas de retard d\'expédition, un mail vous sera adressé pour vous informer d\'une éventuelle conséquence sur le délai de livraison qui vous a été indiqué. Conformément aux dispositions légales, en cas de retard de livraison, vous bénéficiez de la possibilité d\'annuler la commande dans les conditions et modalités définies à l\'article L 138-2 du Code de la Consommation. Si entre temps vous recevez le produit nous procéderons à son remboursement et aux frais d\'acheminement dans les conditions de l\'article L 138-3 du Code de la Consommation. En cas de livraisons par un transporteur, la société ERECA ne peut être tenue pour responsable de retard de livraison dû exclusivement à une indisponibilité du client après plusieurs propositions de rendez-vous.\n'
                            +'Article 10 - Garantie\n'
                            +'Tous nos produits bénéficient de la garantie légale de conformité et de la garantie des vices cachés, prévues par les articles 1641 et suivants du Code civil. En cas de non-conformité d\'un produit vendu, il pourra être retourné, échangé ou remboursé. Toutes les réclamations, demandes d\'échange ou de remboursement doivent s\'effectuer par message via le formulaire dédié sur le site dans le délai de 30 jours de la livraison. Les produits doivent nous être retournés dans l\'état dans lequel vous les avez reçus avec l\'ensemble des éléments (accessoires, emballage, notice...). Les frais d\'envoi vous seront remboursés sur la base du tarif facturé, les frais de retour eux restent à votre charge. Les dispositions de cet Article ne vous empêchent pas de bénéficier du droit de rétractation prévu à l\'article 6.\n'
                            +'Article 11 - Responsabilité\n'
                            +'Les produits proposés sont conformes à la législation française en vigueur. La responsabilité de la société ERECA ne saurait être engagée en cas de non-respect de la législation du pays où le produit est livré. Il vous appartient de vérifier auprès des autorités locales les possibilités d\'importation ou d\'utilisation des produits ou services que vous envisagez de commander. Par ailleurs, la société ERECA ne saurait être tenue pour responsable des dommages résultant d\'une mauvaise utilisation du produit acheté. Enfin la responsabilité de la société ERECA ne saurait être engagée pour tous les inconvénients ou dommages inhérents à l\'utilisation du réseau Internet, notamment une rupture de service, une intrusion extérieure ou la présence de virus informatiques.\n'
                            +'Article 12 - Droit applicable en cas de litiges\n'
                            +'La langue du présent contrat est la langue française. Les présentes conditions de vente sont soumises à la loi française. En cas de litige, les tribunaux français seront les seuls compétents.\n'
                            +'Article 13 - Propriété intellectuelle\n'
                            +'Tous les éléments du site www. fox-driver.com sont et restent la propriété intellectuelle et exclusive de la société ERECA. Nul n\'est autorisé à reproduire, exploiter, rediffuser, ou utiliser à quelque titre que ce soit, même partiellement, des éléments du site qu\'ils soient logiciels, visuels ou sonores. Tout lien simple ou par hypertexte est strictement interdit sans un accord écrit exprès de la société ERECA.\n'
                            +'Article 14 - Données personnelles\n'
                            +'La société ERECA se réserve le droit de collecter les informations nominatives et les données personnelles vous concernant. Elles sont nécessaires à la gestion de votre commande, ainsi qu\'à l\'amélioration des services et des informations que nous vous adressons. Elles peuvent aussi être transmises aux sociétés qui contribuent à ces relations, telles que celles chargées de l\'exécution des services et commandes pour leur gestion, exécution, traitement et paiement. Ces informations et données sont également conservées à des fins de sécurité, afin de respecter les obligations légales et réglementaires. Conformément à la loi du 6 janvier 1978, vous disposez d\'un droit d\'accès, de rectification et d\'opposition aux informations nominatives et aux données personnelles vous concernant, directement sur le site Internet.\n'
                            +'Article 15 - Archivage Preuve\n'
                            +'La société ERECA archivera les bons de commandes et les factures sur un support fiable et durable constituant une copie fidèle conformément aux dispositions de l\'article 1348 du Code civil. Les registres informatisés de la société ERECA seront considérés par toutes les parties concernées comme preuve des communications, commandes, paiements et transactions intervenus entre les parties.\n'
                    }
                ]
            }
        ],
        footer: function(page, pages){
                return {
                    columns:[
                        {width: '90%', text: 'FoxDriver est vendu par:\ne.re.c.a - 33 rue Jean Jaurès - 69120 Vaulx en Velin - contact@fox-driver.com\ns.a.r.l au capital de 30 000€ - Siret 38343027900026', alignment: 'center'},
                        {
                            width: '10%',
                            aligment: 'right',
                            text:[
                                '\n',
                                {text: page.toString() } ,
                                '/',
                                {text: pages.toString()}
                            ]
                        }
                    ],
                    margin: [0,-10]
                };
        },
        styles: {
            table_margin: {
                margin: [0,5,0,15],
                fontSize: 10
            },
            tableHeader: {
                bold: true
            },
            subheader:{
                bold: true,
                fontSize: 13
            },
            header:{
                fontsize: 15,
                bold: true
            }
        }
    };

    if(moyenPayement=='Carte Bleue')
        pdfMake.createPdf(dd).download('CB_'+numeroFacture+'.pdf');
    else
        pdfMake.createPdf(dd).download('PP_'+numeroFacture+'.pdf');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
//Cette fonction crée de manière dynamique la tableau de la facture
// @param :
//    - listeLignes   : indique la liste des produits à apparaitre sur la facture et leur quantité
//    - listeProduits : contient la liste de tous les produits disponibles
// @return : ProduitsEtTotal, un tableau :
//    - ProduitsEtTotal[0] : contient le tableau du pdf
//    - ProduitsEtTotal[1] : contient le Total Produit TTC (string)
//    - ProduitsEtTotal[2] : contient le pourcentage de TVA (ex: 1.2) (float)
///////////////////////////////////////////////////////////////////////////////////////////////////////
function createListeProduits(listeLignes,listeProduits){
	var body            = [[{text:'Description', style: 'tableHeader'},{text:'Prix unitaire TTC (€)', style: 'tableHeader', alignment: 'center'},{text:'Quantité', style: 'tableHeader', alignment: 'center'},{text:'Total TTC (€)', style: 'tableHeader', alignment: 'right'}]];
	var ProduitsEtTotal = [];

	var totalPrixProduits = 0.00;
	var nombreLignes      = listeLignes.length;
	var nombreProduits    = listeProduits.length;

	for(var i = 0; i < nombreLignes; i++){
		var line = 0;

		for(var j = 0; j < nombreProduits; j++){
			if(listeLignes[i]['idProduct']===listeProduits[j]['id'] && listeProduits[j]['ref']!=="SHIP"){
				var title        = $('<textarea/>').html(replaceHTMLentities(listeProduits[j]['title'])).text();
				var description  = $('<textarea/>').html(replaceHTMLentities(listeProduits[j]['description'])).text();
				var prixUnitaire = toFixedv2(parseFloat(listeLignes[i]['price'])*parseFloat(listeProduits[j]['vat']),2);
				var quantite     = parseFloat(listeLignes[i]['quantity']);
				line             = [{stack: [title,{text:description, italics: true, fontSize: 8}]},{text: prixUnitaire.toString(), alignment: 'center'},{text: quantite.toString(), alignment: 'center'},{text: (quantite*prixUnitaire).toFixed(2), alignment: 'right'}];
			}
		}
		if(line!==0){
			body.push(line);
			totalPrixProduits += quantite*prixUnitaire;
		}
	}

	ProduitsEtTotal[0] = body;
	ProduitsEtTotal[1] = toFixedv2(totalPrixProduits,2);
	ProduitsEtTotal[2] = parseFloat(listeProduits[0]['vat']);

	return ProduitsEtTotal;
}

function createListeProduitsRefund(listeLignes,listeProduits){
    var body            = [[{text:'Description', style: 'tableHeader'},{text:'Prix unitaire TTC (€)', style: 'tableHeader', alignment: 'center'},{text:'Quantité', style: 'tableHeader', alignment: 'center'},{text:'Total TTC (€)', style: 'tableHeader', alignment: 'right'}]];
    var ProduitsEtTotal = [];

    var totalPrixProduits = 0.00;
    var nombreLignes      = listeLignes.length;
    var nombreProduits    = listeProduits.length;

    for(var i = 0; i < nombreLignes; i++){
        var line = 0;

        for(var j = 0; j < nombreProduits; j++){
            if(listeLignes[i]['idProduct']===listeProduits[j]['id'] && listeProduits[j]['ref']!=="SHIP"){
                var title        = $('<textarea/>').html(replaceHTMLentities(listeProduits[j]['title'])).text();
                var description  = $('<textarea/>').html(replaceHTMLentities(listeProduits[j]['description'])).text();
                var prixUnitaire = toFixedv2(parseFloat(listeLignes[i]['price'])*parseFloat(listeProduits[j]['vat']),2);
                var quantite     = parseFloat(listeLignes[i]['quantity']) * -1;
                line             = [{stack: [title,{text:description, italics: true, fontSize: 8}]},{text: prixUnitaire.toString(), alignment: 'center'},{text: quantite.toString(), alignment: 'center'},{text: (quantite*prixUnitaire).toFixed(2), alignment: 'right'}];
            }
        }

        if(line!==0){
            body.push(line);
            totalPrixProduits += quantite*prixUnitaire;
        }
    }

    ProduitsEtTotal[0] = body;
    ProduitsEtTotal[1] = toFixedv2(totalPrixProduits,2);
    ProduitsEtTotal[2] = parseFloat(listeProduits[0]['vat']);

    return ProduitsEtTotal;
}

//fonction courte qui convertit un tva float du style 1.2 en string 20.000
function convertTVAtoSrint(tva){
	tva = (tva-1)*100;
	return toFixedv2(tva,3);
}

//Convertit les entités HTML <br> deviendra un saut de ligne et <strong> sera supprimé.
function replaceHTMLentities(str) {
	str = str.replace(/<strong\s*\/?>/mg,"");
	str = str.replace(/<\/strong\s*\/?>/mg,"");
    return str.replace(/<br\s*\/?>/mg,"\n");
}

//On utilise cette fonction à la place de mettre la méthode tofixed() car elle a quelques problèmes pour des nombre spécifiques
// (1.015).toFixed(2) -> 1.02 (correct)
// (1.005).toFixed(2) -> 1.00 (incorrect)
function toFixedv2( num, precision ) {
    return (+(Math.round(+(num + 'e' + precision)) + 'e' + -precision)).toFixed(precision);
}
