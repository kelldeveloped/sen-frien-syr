import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayJS from 'dayjs';
//redux
import { connect } from 'react-redux';
// materialui
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
// icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = (theme) => ({
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: theme.palette.primary.main
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    }
});

class Profile extends Component {
    render() {
        const { classes, user: { credentials: { selectHandle, createdAt, imageUrl, bio, website, location }, loading, authenticated } } = this.props;
        // this is nested destructuring!
        // adding a loading property to the user -> this is different from ui loading

        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="user" className="profile-image" />
                    </div>
                    <hr />
                    {/* hr = horizontal ruler -> using this to create some space between profile pic and rest of profile info*/}
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${selectHandle}`} color="primary" variant="h5">
                            {/* title that says name of user and also links to their user page
                         since this is built on top of typography, we can pass in variant to change the size */}
                            @{selectHandle}
                        </MuiLink>
                        <hr />
                        {bio && <Typography variant="body2"> {bio} </Typography>}
                        {/* we need to check if the user has a bio, then we show it */}
                        <hr />
                        {location && (
                            <Fragment>
                                <LocationOn color="primary" />
                                <span> {location} </span>
                                <hr />
                                {/* if there's no location, we don't want to have two hrs on top of each other */}
                            </Fragment>
                            //  fragment is a react component that doesn't render anything -> it just wraps things so they'll be together in one element
                        )}
                        {website && (
                            <Fragment>
                                <LinkIcon color="primary" />
                                <a href={website} target="_blank" rel="noopener noreferrer">
                                    {/* rel="noopener noreferrer" is a react thing */}
                                    {'  '}{website}
                                </a>
                                <hr />
                            </Fragment>
                        )}
                        <CalendarToday color="primary" />
                        {'  '}
                        <span> joined {dayJS(createdAt).format('MMM YYYY')}</span>
                    </div>
                </div>
            </Paper>
        ) : (
                <Paper className={classes.paper}>
                    <Typography variant="body2" align="center">
                        no profile found
                    <div className={classes.buttons}>
                            <Button variant="contained" color="primary" component={Link} to="/login"> login </Button>
                            <Button variant="contained" color="secondary" component={Link} to="/signup"> signup </Button>
                        </div>
                    </Typography>
                </Paper>
            )) : (<p> profile loading... </p>)
        // two ternary operators: if not loading, check if we're authenticated, otherwise show profile loading text -> if we're authenticated, 

        return profileMarkup;
    }
};

const mapStateToProps = (state) => ({
    user: state.user
});

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(Profile))
