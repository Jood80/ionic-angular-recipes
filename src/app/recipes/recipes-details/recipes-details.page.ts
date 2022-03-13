import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private recipesService: RecipesService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('recipeId')) {
        return; // for now instead of redirect
      }
      const recipeId = paramMap.get('recipeId');
      this.loadedRecipe = this.recipesService.getRecipe(recipeId);
    });
  }
}
