import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements AfterViewInit {

  @Input() title: string = "";

  expand = false;
  reload = false;
  collapse = false;
  remove = false;
  showFooter = false;
  noBody = false;

  ngAfterViewInit() {
  }

  panelExpand() {
    this.expand = !this.expand;
  }
  panelReload() {
    this.reload = true;

    setTimeout(() => {
      this.reload = false;
    }, 1500);
  }
  panelCollapse() {
    this.collapse = !this.collapse;
  }
  panelRemove() {
    this.remove = !this.remove;
  }
}

