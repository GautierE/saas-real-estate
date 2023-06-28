import { Component } from '@angular/core';
import { PriceCardInterface } from '../interfaces/PriceCardInterface';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
})
export class PricesComponent {
  agent360CardData: PriceCardInterface = {
    logoPath:
      'assets/solutions-section/solutions-cards/agent-360-logo-color.svg',
    title: 'AGENT 360',
    paragraph:
      "Regroupe des outils destinés à la prospection, création de dossiers d'estimations et d'études de marché ainsi qu'à la mise en place d'une veille immobilière performante.",
    items: [
      'Agent immobilier',
      'Mandataire',
      'Agent commercial',
      'Chasseur de biens',
      'Administrateur de biens',
    ],
    color: 'agent360',
  };

  adb360CardData: PriceCardInterface = {
    logoPath: 'assets/solutions-section/solutions-cards/adb-360-logo-color.svg',
    title: 'ADB 360',
    paragraph:
      'Permet de réaliser des études locatives complètes, rechercher des références, accéder à des indicateurs et à une représentation cartographique du marché.',
    items: [
      'Administrateur de biens',
      'Gestionnaire locatif',
      'Conseiller locatif',
      'Syndic de copropriété',
    ],
    color: 'adb360',
  };

  data360CardData: PriceCardInterface = {
    logoPath:
      'assets/solutions-section/solutions-cards/data-360-logo-color.svg',
    title: 'DATA 360',
    paragraph:
      'Regroupe des outils destinés aux analyses et études de marchés ainsi qu’à la consultation en ligne des produits en cours et hors commercialisation.',
    items: [
      'Promoteur',
      "Foncière / Gestionnaire d'actifs",
      'Bailleur social',
      'Expert immobilier',
      'Banque / Assurance',
      "Collectivité locale / Agence d'urbanisme",
    ],
    color: 'data360',
  };

  apiCardData: PriceCardInterface = {
    logoPath: 'assets/solutions-section/solutions-cards/api-logo-color.svg',
    title: 'API',
    paragraph:
      "Destinée à tout type d'acteur ayant des besoins en données immobilières, notre API est la solution idéale pour associer votre expertise à nos données.",
    items: [
      'Développeur',
      'Data Scientist',
      'Responsable digital',
      'Responsable des données',
      "Directeur des systèmes d'informations",
    ],
    color: 'api',
  };
}
