import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  title = signal('Software Grower');
  
  navLinks = signal([
    { label: 'Home',     path: '/'         },
    { label: 'About',    path: '/about'    },
    { label: 'Projects', path: '/projects' },
    { label: 'Stack',    path: '/stack'    },
    { label: 'Blog',     path: '/blog'     },
    { label: 'Contact',  path: '/contact'  },
  ]);
}
