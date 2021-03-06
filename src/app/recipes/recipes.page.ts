import { Component, OnInit } from '@angular/core';
import { Recipes } from './recipes.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage {
  recipes: Recipes[];

  constructor(private recipesService: RecipesService) {}

  ionViewWillEnter() {
    this.recipes = this.recipesService.getAllRecipes();
  }
}
