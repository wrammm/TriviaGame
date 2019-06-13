import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TriviaQuestionsService } from './trivia-questions.service';
import { SinglePlayerComponent } from './components/single-player/single-player.component';
import { TwoPlayerComponent } from './components/two-player/two-player.component';

@NgModule({
	declarations: [ AppComponent, SinglePlayerComponent, TwoPlayerComponent ],
	imports: [ BrowserModule, AppRoutingModule, HttpClientModule ],
	providers: [ TriviaQuestionsService ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
