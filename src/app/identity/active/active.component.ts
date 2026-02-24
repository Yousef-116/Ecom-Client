import { AfterViewInit, Component } from '@angular/core';
import { IActive } from '../../Models/Account';
import { IdentityService } from '../identity.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

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
  ) {}
  ngAfterViewInit(): void {
    //throw new Error('Method not implemented.');
    this.router.queryParams.subscribe((params) => {
      this.activeParams = {
        email: params['email'],
        token: params['code'],
      };
    });

    this.identityService.active(this.activeParams).subscribe({
      next: (response) => {
        this.toaster.success(response);
      },
      error: (error) => {
        this.toaster.error(error);
      },
    });
  }
}
