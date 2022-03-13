import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { Recipes } from '../recipes.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.page.html',
  styleUrls: ['./recipes-details.page.scss'],
})
export class RecipesDetailsPage implements OnInit {
  loadedRecipe: Recipes;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipesService: RecipesService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('recipeId')) {
        this.router.navigate(['/recipes']);
        return;
      }
      const recipeId = paramMap.get('recipeId');
      this.loadedRecipe = this.recipesService.getRecipe(recipeId);
    });
  }

  async onDeleteRecipe() {
    const alert = await this.alertCtrl.create({
      header: 'You sure to delete?',
      message: 'It is one way ticket, once you confirm there is no way back!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          id: 'cancel-button',
          cssClass: 'secondary',
        },
        {
          text: 'Delete',
          id: 'confirm-delete',
          handler: () => {
            this.recipesService.removeRecipe(this.loadedRecipe.id);
            this.router.navigate(['/recipes']);
          },
        },
      ],
      animated: true,
    });
    await alert.present();
  }
}
