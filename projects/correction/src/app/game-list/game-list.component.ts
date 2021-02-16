import { AfterViewInit, Component, HostListener, ViewChild, OnInit, ElementRef } from '@angular/core';
import { of } from 'rxjs';
import { ActionType, GameFilter } from './models';

interface Game {
  name: string;
  /** Note sur 10. */
  note: number;
  type: string;
  description: string;
  /** URL of the cover image; */
  coverImage: string;
  editor: string;
}

// const aze = (a: number) => {
//   return {
//     square: a ** 2
//   };
// };

// const azr = (a: number) => ({ square: a ** 2 });
// false || 0 || '' || null || undefined || [] || 3 => [] (car toutes celles à gauches sont "falsy")
const gen = (name: string, note: number, coverImage: string, editor: string, type: string = null, description: string = null) => ({
  name, editor, note, coverImage, type: type || 'Platform', description
});

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements AfterViewInit {

  // width = 300;
  private initialWidth: number;
  width: number;

  private readonly allGames: Game[] = [
    gen(
      'BattleBlock Theater®',
      9.8,
      'https://cdn.cloudflare.steamstatic.com/steam/apps/238460/header.jpg?t=1599169670',
      'Behemot Studio',
      null,
      `<div id="game_area_description" class="game_area_description">
							<h2>À propos de ce jeu</h2>
              Échoué… capturé… trahi… contraint de se donner en spectacle devant un public félin&nbsp;!? Oui, tout ça et bien plus encore dans BattleBlock Theater&nbsp;! Une fois lancé dans votre quête pour libérer plus de 300 de vos amis faits prisonniers par des chats diaboliques et hautement évolués, il n'y aura plus de retour possible. Plongez au cœur de cette histoire de trahison renversante et usez de votre arsenal d'armes-outils pour progresser dans des centaines de niveaux et élucider le mystère qui plane sur BattleBlock Theater.<br><br>Si vous n'aimez pas être seul sous les feux des projecteurs, partez en ligne ou trouvez un bon copain en chair et en os pour accomplir une quête cooptimisée aux petits oignons ou participer aux arènes. Le jeu inclut également un éditeur de niveaux pour vous permettre de créer vous-même des épreuves et défis tordus&nbsp;!<h2 class="bb_tag">Contenu proposé</h2><br><ul class="bb_ul"><li>JEU COOPTIONNEL&nbsp;– Réfléchissez à plusieurs… ou tout seul. Jeu en ligne&nbsp;! Accolades de canapé&nbsp;! Meilleur jeu du monde&nbsp;! Jusqu'à deux joueurs en mode Histoire et quatre en Arène&nbsp;! <br><br></li><li>ARÈNES&nbsp;– En couronnant un roi ou en chassant la baleine, les acteurs de BattleBlock&nbsp;Theater ont 8&nbsp;modes d'arène pour donner de bonnes raisons à leurs ennemis d'avoir le trac&nbsp;!  <br><br></li><li>MODE INSENSÉ&nbsp;– On ne vit qu'une fois, et pas seulement à la télé, mais aussi sur scène&nbsp;! Mettez vos talents à rude épreuve dans une campagne ultime.<br><br></li><li>ANIMATIONS UNIQUES&nbsp;– Qui dit version Steam dit nouveaux sprites&nbsp;! Le Garde chat fait son entrée sur la grande scène. <br> <br></li><li>PLUS DE 450 NIVEAUX&nbsp;– Jeu solo, multi, arène… On a plus de niveaux que Hatty peut compter sur ses mains pleines de doigts.<br><br></li><li>300&nbsp;PRISONNIERS À LIBÉRER&nbsp;– Fraîchement capturés par la population féline native, c'est à VOUS de les libérer&nbsp;! Gagnez des gemmes pour libérer vos amis en participant à des joutes de gladiateurs mortelles.  <br> <br></li><li>ARSENAL ET COMBAT DRAMATIQUES&nbsp;– Bondissez, bousculez et bataillez jusqu'à la victoire&nbsp;! Et si ça ne marche pas, vous pouvez aussi exploser, geler, empoisonner ou digérer un bébé&nbsp;! Bonus&nbsp;: vous aurez la possibilité d'emporter deux armes avec vous pour en changer quand vous voulez.<br><br></li><li>CRÉEZ ET PARTAGEZ VOS NIVEAUX&nbsp;– Créez des œuvres d'art dans notre Éditeur de niveaux et partagez-les avec vos amis (ou des inconnus). Avec plus de 20&nbsp;types de blocs interactifs, vous aurez de quoi faire&nbsp;!</li></ul>						</div>`),
    ...Array.from({ length: 10 }, (_, i) => gen(
      'Game n°' + (i + 1),
      i % 11,
      'https://fakeimg.pl/300/',
      i % 2 === 0 ? 'Behemot Studio' : 'Abyss',
      i % 2 === 0 ? 'Platform' : 'Aventure',
      'Bla'
    ))
  ];

  games = this.allGames;

  ngAfterViewInit(): void {
    setTimeout(() => {
      const width = (document.querySelector('.card') as any).offsetWidth;
      this.width = width;
      this.initialWidth = width;
    }, 0);
  }

  // @ViewChild('myCards')
  // private set cards(cards: ElementRef) {
  //   setTimeout(() => this.width = cards.nativeElement.children[0].offsetWidth, 0);
  // }

  onResetSize(): void {
    this.width = this.initialWidth;
  }

  onAction(action: ActionType, game: Game): void {
    window.alert(`User '${action}' ${game.name}`);
  }

  onFilter(filter: GameFilter): void {
    const games = [];

    for (const game of this.allGames) {
      if ((!filter.name || game.name.toLowerCase().includes(filter.name.toLowerCase()))
          && (!filter.editor || game.editor.toLowerCase().includes(filter.editor.toLowerCase()))
          && (!filter.type || game.editor === filter.type)) {
        games.push(game);
      }
    }

    this.games = games;
  }

  // @HostListener('mouseenter')
  // onMouseEnter() {}

  makeDesc(game: Game): string {
    let result = game.description;
    const matches = result.split(/[\s\t]+/);

    if (matches.length > 20) {
      result = matches.slice(0, 20).join(' ') + '...';
    }

    return result;
  }
}
