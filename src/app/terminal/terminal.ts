import { Component, OnInit, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-terminal',
  standalone: true,
  templateUrl: './terminal.html',
  styleUrl: './terminal.css'
})
export class Terminal implements OnInit, OnDestroy {

  lines = signal<{ text: string; color: string }[]>([
    { text: 'Bienvenue sur le terminal de Software Growe.', color: 'cyan' },
    { text: 'Tape "help" pour voir les commandes disponibles.', color: 'amber' },
  ]);

  currentInput = signal('');
  cursorVisible = signal(true);

  private cursorInterval: ReturnType<typeof setInterval> | null = null;

  private commands: Record<string, () => string[]> = {
    help: () => [
      '  whoami      → identité',
      '  stack       → mes technologies',
      '  philosophy  → ma vision',
      '  clear       → vider le terminal',
    ],
    whoami: () => [
      'Mamadou Ahmadou Ka',
      'Software Engineer · DevOps / SRE / DevsecOps · Cloud',
    ],
    stack: () => [
      'Docker · Kubernetes · Terraform',
      'CI/CD · GitHub Actions · ArgoCD',
      'AWS · GCP · Angular · Python',
    ],
    philosophy: () => [
      'Software ships. Always learning. Always growing.',
    ],
    clear: () => [],
  };

  ngOnInit(): void {
    this.cursorInterval = setInterval(() => {
      this.cursorVisible.set(!this.cursorVisible());
    }, 500);
  }

  ngOnDestroy(): void {
    if (this.cursorInterval) clearInterval(this.cursorInterval);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.executeCommand();
    } else if (event.key === 'Backspace') {
      this.currentInput.update(v => v.slice(0, -1));
    } else if (event.key.length === 1) {
      // caractère simple — on l'ajoute à l'input
      this.currentInput.update(v => v + event.key);
    }
  }

  private executeCommand(): void {
    const cmd = this.currentInput().trim().toLowerCase();

    // affiche la ligne de commande tapée
    this.lines.update(l => [...l, { text: '$ ' + cmd, color: 'prompt' }]);

    if (cmd === 'clear') {
      this.lines.set([]);
    } else if (cmd === '') {
      // rien
    } else if (this.commands[cmd]) {
      const output = this.commands[cmd]();
      this.lines.update(l => [
        ...l,
        ...output.map(text => ({ text, color: 'green' }))
      ]);
    } else {
      this.lines.update(l => [
        ...l,
        { text: `commande introuvable : "${cmd}" — tape "help"`, color: 'red' }
      ]);
    }

    // reset l'input
    this.currentInput.set('');
  }
}