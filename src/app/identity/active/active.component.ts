import { AfterViewInit, Component } from '@angular/core';
import { IActive } from '../../shared/models';
import { IdentityService } from '../identity.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-active',
  standalone: true,
  imports: [],
  templateUrl: './active.component.html',
  styleUrl: './active.component.scss',
})
export class ActiveComponent implements AfterViewInit {
  activeParams: IActive;
  constructor(
    private identityService: IdentityService,
    private toaster: ToastrService,
    private router: ActivatedRoute,
    private route: Router,
  ) { }
  ngAfterViewInit(): void {
    this.router.queryParams.subscribe((params) => {
      const email = params['email'];
      const code = decodeURIComponent(params['code']);

      console.log('Email:', email);
      console.log('Decoded Code:', code);

      this.activeParams = {
        email: email, // Try changing to 'Email'
        token: code, // Try changing to 'Token' or 'Code' based on your DTO
      };

      console.log('Sending params:', this.activeParams);

      this.identityService.active(this.activeParams).subscribe({
        next: (response) => {
          console.log('Activation success:', response);
          this.toaster.success(response);
          this.route.navigateByUrl('/account/login');
        },
        error: (error) => {
          console.error('Activation error details:', error);
          this.toaster.error(error.error?.message || 'Activation failed');
        },
      });
    });
  }
}


