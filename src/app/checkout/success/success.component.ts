import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
})
export class SuccessComponent implements OnInit {
  constructor(private router: ActivatedRoute) {}
  ngOnInit(): void {
    this.router.queryParams.subscribe((param) => {
      this.orderId = param['orderId'];
    });
  }
  orderId: number = 0;
}
