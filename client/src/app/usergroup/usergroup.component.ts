import { Component, OnInit } from '@angular/core';
import { Http } from '../../../node_modules/@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usergroup',
  templateUrl: './usergroup.component.html',
  styleUrls: ['./usergroup.component.css']
})
export class UsergroupComponent implements OnInit {
  gdata;
  gname;

  constructor(public chathttp: Http, public chatroute: Router) {
    this.get_groups();
   }

   get_groups() {
     this.chathttp.get('gapi/getgroup').subscribe(this.cb);
   }
   cb = (g) => {
     this.gdata = JSON.parse(g._body);
   }

      add_group() {
        const gobj = {groupname: this.gname};
        this.chathttp.post('gapi/setgroup', gobj).subscribe();
      }


    tochat() {
      this.chatroute.navigateByUrl('chatstart');
     }

  ngOnInit() {
  }

}
