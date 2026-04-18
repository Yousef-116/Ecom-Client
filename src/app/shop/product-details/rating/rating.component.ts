import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { RatingService } from '../../../rating.service';
// import { ProductRatingDTO } from '../../../../shared/models/rating';
// import { IdentityService } from '../../../../identity/identity.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { ProductRatingDTO } from '../../../shared/models';
import { RatingService } from '../../rating.service';
import { IdentityService } from '../../../identity/identity.service';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent implements OnInit, OnChanges {
  @Input() productId!: number;
  @Output() ratingChanged = new EventEmitter<{ avg: number, count: number }>();

  ratings: ProductRatingDTO[] = [];
  userName: string | null = null;
  averageRating: number = 0;

  newRatingMessage: string = '';
  newRatingScore: number = 0;
  hoverScore: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];

  constructor(
    private ratingService: RatingService,
    private identityService: IdentityService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.identityService.userName$.subscribe(name => {
      this.userName = name;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productId'] && this.productId) {
      this.loadRatings();
    }
  }

  loadRatings() {
    this.ratingService.getRatingsByProductId(this.productId).subscribe({
      next: (data) => {
        this.ratings = data;
        this.calculateAverage();
      },
      error: (err) => {
        if (err.status !== 404) {
          console.error('Error loading ratings', err);
        }
        this.ratings = [];
        this.averageRating = 0;
      }
    });
  }

  calculateAverage() {
    if (this.ratings.length === 0) {
      this.averageRating = 0;
    } else {
      const sum = this.ratings.reduce((acc, current) => acc + current.score, 0);
      this.averageRating = sum / this.ratings.length;
    }

    this.ratingChanged.emit({
      avg: this.averageRating,
      count: this.ratings.length
    });
  }

  setScore(score: number) {
    this.newRatingScore = score;
  }

  setHoverScore(score: number) {
    this.hoverScore = score;
  }

  submitRating() {
    if (this.newRatingScore === 0) {
      this.toastr.warning('Please select a star rating.', 'Warning');
      return;
    }

    if (!this.userName) {
      this.toastr.error('You must be logged in to leave a rating.', 'Error');
      return;
    }

    const newRating = {
      productId: this.productId,
      score: this.newRatingScore,
      message: this.newRatingMessage,
      username: this.userName
    };

    this.ratingService.addRating(newRating).subscribe({
      next: (res) => {
        this.toastr.success('Rating submitted successfully!', 'Success');
        this.newRatingMessage = '';
        this.newRatingScore = 0;
        this.loadRatings();
      },
      error: (err) => {
        this.toastr.error('Failed to submit rating.', 'Error');
        console.error(err);
      }
    });
  }
}


