import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-join-conference',
  templateUrl: './join-conference.component.html',
  styleUrls: ['./join-conference.component.css']
})
export class JoinConferenceComponent implements OnInit {

  conferenceId = null;

  conferenceForm = this.formBuilder.group({
    id: '',
    name: ''
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }

  async ngOnInit(): Promise<void> {
    this.conferenceId = this.route.snapshot.paramMap.get('id');
    this.conferenceForm.setValue({ id: this.conferenceId, name: '' });
  }

  onSubmit() {
    this.router.navigate([ '/conference', { id: this.conferenceForm.value.id, name: this.conferenceForm.value.name }]);
  }

}
