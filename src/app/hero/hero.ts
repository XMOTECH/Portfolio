import { Component, input } from '@angular/core';
import { Terminal } from "../terminal/terminal";

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [Terminal],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {

  name = input<string>('Mamadou Ahmadou ka');
  tagline  = input<string>('Software ships');
  role     = input<string>('Software Engineer · DevOps / SRE / DevsecOps · Cloud');
  bio      = input<string>('Passionné par l\'automatisation, la fiabilité des systèmes et la culture DevSecOps. En apprentissage continu — je construis, je ship, je scale.')
}
