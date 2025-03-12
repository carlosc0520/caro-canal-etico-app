import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { SectionScrollService } from 'src/resources/services/inicio/section-scroll.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscription!: Subscription;
  private observer!: IntersectionObserver;

  @ViewChild('inicio') inicioSection!: ElementRef;
  @ViewChild('queEs') queEsSection!: ElementRef;
  @ViewChild('comoEnviar') comoEnviarSection!: ElementRef;
  @ViewChild('soporte') soporteSection!: ElementRef;

  constructor(private sectionScrollService: SectionScrollService) {}

  ngOnInit() {
    this.subscription = this.sectionScrollService.section$.subscribe(sectionId => {
      if (sectionId) {
        this.scrollToSection(sectionId);
      }
    });
  }

  ngAfterViewInit() {
    const sections = [
      { id: 'inicio', el: this.inicioSection },
      { id: 'queEs', el: this.queEsSection },
      { id: 'comoEnviar', el: this.comoEnviarSection },
      { id: 'soporte', el: this.soporteSection }
    ];

    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeSection = sections.find(sec => sec.el?.nativeElement === entry.target);
          if (activeSection) {
            this.sectionScrollService.setActiveSection(activeSection.id);
          }
        }
      });
    }, { threshold: 0.6 });

    sections.forEach(section => {
      if (section.el?.nativeElement) {
        this.observer.observe(section.el.nativeElement);
      }
    });
  }

  scrollToSection(sectionId: string) {
    const sections: { [key: string]: ElementRef } = {
      inicio: this.inicioSection,
      queEs: this.queEsSection,
      comoEnviar: this.comoEnviarSection,
    };

    const section = sections[sectionId];
    if (section) {
      section.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.observer.disconnect();
  }
}